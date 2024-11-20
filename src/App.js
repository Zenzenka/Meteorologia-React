import React, { useState } from "react";

const WeatherSearch = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "e5ef09bfaeb7a081742aeae4d4e1d2ac"; // Chave atualizada
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";

  const fetchWeather = async () => {
    if (!city) {
      setError("Por favor, insira o nome de uma cidade.");
      return;
    }

    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
      );

      if (!response.ok) {
        throw new Error("Cidade não encontrada!");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message || "Ocorreu um erro ao buscar os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Busca de Dados Meteorológicos</h1>
      <input
        type="text"
        placeholder="Digite o nome da cidade"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={styles.input}
      />
      <button onClick={fetchWeather} style={styles.button}>
        Buscar
      </button>

      {loading && <p style={styles.loading}>Carregando...</p>}

      {error && <p style={styles.error}>{error}</p>}

      {weatherData && (
        <div style={styles.result}>
          <h2>{weatherData.name}</h2>
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Condição: {weatherData.weather[0].description}</p>
          <p>Umidade: {weatherData.main.humidity}%</p>
          <p>Velocidade do vento: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh", // Centraliza verticalmente
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "60%",
    marginBottom: "10px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginBottom: "20px",
  },
  loading: {
    color: "blue",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  result: {
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    width: "60%", // Largura fixa
    backgroundColor: "#f9f9f9",
    textAlign: "left",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Sombras para destaque
  },
};

export default WeatherSearch;
