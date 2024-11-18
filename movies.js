// Replace 'your_api_key' with your actual OMDb API key
const apiKey = '96452e0c';

// List of sports-related keywords
const sportsKeywords = ['football', 'basketball', 'tennis', 'soccer', 'volleyball', 'championship', 'tournament', 'league'];

// Function to fetch movies based on keywords
async function fetchSportsMovies() {
    try {
        // Create an array of fetch promises for each keyword
        const searchPromises = sportsKeywords.map(keyword =>
            fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(keyword)}&type=movie`)
                .then(response => response.json())
        );

        // Wait for all searches to complete
        const searchResults = await Promise.all(searchPromises);

        // Combine all movie results, ensuring no duplicates
        const allMovies = searchResults.reduce((acc, curr) => {
            if (curr.Response === 'True') {
                acc.push(...curr.Search);
            }
            return acc;
        }, []);

        // Remove duplicates based on IMDb ID
        const uniqueMovies = Array.from(new Map(allMovies.map(movie => [movie.imdbID, movie])).values());

        // Fetch detailed info to filter by genre
        const detailedPromises = uniqueMovies.map(movie =>
            fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
                .then(response => response.json())
        );

        const detailedMovies = await Promise.all(detailedPromises);

        // Filter movies that have 'sport' or 'sports' in their genre
        const sportsMovies = detailedMovies.filter(movie =>
            movie.Genre.toLowerCase().includes('sport') ||
            movie.Genre.toLowerCase().includes('sports')
        );

        // Display the filtered sports movies
        displayMovies(sportsMovies);
    } catch (error) {
        console.error('Error fetching sports movies:', error);
        document.getElementById('movie-list').innerHTML = `<p>Error loading sports movies.</p>`;
    }
}

// Function to display movies in the HTML
function displayMovies(movies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = ''; // Clear existing content

    if (movies.length === 0) {
        movieList.innerHTML = `<p>No sports movies found.</p>`;
        return;
    }

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('col-md-4', 'mb-3');

        movieCard.innerHTML = `
            <div class="card h-100">
                <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'images/default-movie.png'}" class="card-img-top" alt="${movie.Title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${movie.Title}</h5>
                    <p class="card-text">Year: ${movie.Year}</p>
                    <p class="card-text">Genre: ${movie.Genre}</p>
                    <a href="https://www.imdb.com/title/${movie.imdbID}/" target="_blank" class="mt-auto btn btn-primary">View on IMDb</a>
                </div>
            </div>
        `;

        movieList.appendChild(movieCard);
    });
}

// Initialize fetching when the page loads
window.addEventListener('DOMContentLoaded', fetchSportsMovies);
