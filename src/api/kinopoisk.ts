import axios from 'axios';
import { Movie, MovieDetails, ApiResponse } from './types';

// Явная проверка переменных окружения
if (!import.meta.env.VITE_API_KEY) {
  throw new Error('API key is missing in environment variables')
}

const API_URL = import.meta.env.VITE_API_URL || 'https://api.kinopoisk.dev/v1.4'
const API_KEY = import.meta.env.VITE_API_KEY

// Проверка ключа в development-режиме
if (import.meta.env.DEV && !API_KEY) {
  console.error('API key is missing! Check your .env file');
}

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'X-API-KEY': API_KEY,
    'Accept': 'application/json'
  },
  timeout: 8000
});

export const fetchMovies = async (
  page: number,
  limit: number,
  filters?: Record<string, any>
): Promise<ApiResponse<Movie[]>> => {
  const params = {
    page,
    limit,
    ...filters
  };

  console.log('[API] Отправка запроса с параметрами:', params);

  try {
    const response = await instance.get<ApiResponse<Movie[]>>('/movie', { 
      params,
      timeout: 15000
    });
    
    console.log('[API] Успешный ответ:', {
      status: response.status,
      count: response.data.docs.length
    });
    
    return response.data;
  } 

  catch (error) {
    console.error('[API] Полная ошибка:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
};

export const fetchMovieById = async (id: string): Promise<MovieDetails> => {
  const response = await instance.get<MovieDetails>(`/movie/${id}`);
  return response.data;
};