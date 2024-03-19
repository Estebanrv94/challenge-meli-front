import React, { useState, useEffect, createContext, useContext } from "react";
import "./App.scss";

import { SearchBox } from "./components/Search/Search";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import ItemsList from "./components/ItemsList/ItemsList";
import ItemDetail from "./components/ItemDetail/ItemDetail";
import Message from "./components/Message/Message";
import Loader from "./components/Loader/Loader";
import Carousel from "./components/Carousel/Carousel";
import NotFound from "./components/not-found/NotFound";

// Creamos un contexto para manejar el estado global de la aplicación para pasar datos a otros componentes
const AppContext = createContext();

function App() {
  let history = useHistory(); // Hook para acceder al historial de navegación
  const [results, setResults] = useState({}); // Estado para almacenar los resultados de búsqueda
  const [loading, setLoading] = useState(false); // Estado para indicar si la aplicación está cargando
  const [categories, setCategories] = useState({}); // Estado para almacenar las categorías de los resultados
  const location = useLocation(); // Hook para acceder a la ubicación actual

  // Función para obtener los resultados de búsqueda de la API
  const getResults = (query) => {
    setLoading(true);
    fetch(`http://localhost:8080/api/items?q=${query}`, {
      headers: {
        name: "Esteban",
        lastname: "Restrepo",
        // Otros encabezados...
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          console.error(response);
          setLoading(false);
          setResults({ error: response });
        } else {
          setLoading(false);
          setResults(response);
          setCategories(response.categories);
          history.push(`/items?search=${query}`);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setResults({ error: "Connection lost" });
      });
  };

  // Efecto para realizar la búsqueda cuando cambia la ubicación este se usa para usar el url y que busque los datos de item y search
  useEffect(() => {
    const query = new URLSearchParams(location.search).get("search");
    if (query) {
      getResults(query);
    }
  }, [location.search]);

  // Objeto que representa el estado global de la aplicación
  const globalState = {
    results,
    loading,
    getResults,
    categories,
  };

  // Renderiza la aplicación y proporciona el estado global a los componentes hijos
  return (
    <AppContext.Provider value={globalState}>
      <div className="App">
        <SearchBox onSubmit={(query) => getResults(query)} />
        {loading ? (
          <Loader />
        ) : (
          <Switch>
            <Route exact path="/items">
              {results.error ? (
                <Message
                  error={true}
                  message={
                    "Hubo un problema buscando ese producto o no existen resultados"
                  }
                />
              ) : results.items ? (
                results.items.length ? (
                  <ItemsList categories={categories} items={results.items} />
                ) : (
                  <Message
                    error={false}
                    message={
                      "No se eencontraron resultados para tu busqueda."
                    }
                  />
                )
              ) : (
                <Redirect to={"/"} />
              )}
            </Route>
            <Route path="/items/:id" component={ItemDetail} />
                        {/* Ruta para la página no encontrada */}
            <Route component={NotFound} />{" "}
             {/* implementacion de carousel que tiene la pagina al final no se usa */}
            <Carousel />
          </Switch>
        )}
      </div>
    </AppContext.Provider>
  );
}

// Hook personalizado para acceder al contexto de la aplicación (este lo uso en la pagina de item)
export const useGlobalState = () => useContext(AppContext);

export default App;
