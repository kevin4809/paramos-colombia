import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { infoAllParams } from "../utils/paramsInfo";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [actualParamas, setActualParamas] = useState([]);
  const [resultSearchParams, setResultSearchParams] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [actualPage, setactualPage] = useState(1);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    setActualParamas(
      infoAllParams?.map((obj) => {
        return obj;
      })
    );
  }, []);

  useEffect(() => {
    setResultSearchParams(actualParamas.slice(currentPage, currentPage + 9));
  }, [actualParamas, currentPage]);

  const nextPage = () => {
    if (actualPage < 4) {
      setCurrentPage(currentPage + 9);
      setactualPage(actualPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 9);
      setactualPage(actualPage - 1);
    }
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
    filtrer(e.target.value);
  };

  const filtrer = (searchTerm) => {
    let resultSearch = actualParamas.filter((element) => {
      if (
        element.name.toString().toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return element;
      }
    });
     setResultSearchParams(resultSearch);
  };

  const getIds = (id) => {
    const found = infoAllParams.find((e) => e.id === id);
    setIsShow(false);
    filtrer(found.name);
  };

  return (
    <div className="app">
      <div className=" wallpaper">
        <div className="title-param">
          <h5>Colombia</h5>
          <h1>Ecosistemas</h1>
          <h1>Páramos</h1>
          <h1>Naturaleza</h1>
          <h4>Mundo</h4>
        </div>
      </div>

      <section id="up">
        <div className="container-sm">
          <div className="row">
            <div className="col-md-10">
              <div className="input-group mb-3 input-param">
                <div className="search">
                  <input
                    type="text"
                    value={search}
                    className="form-control"
                    placeholder="Escribe el nombre del paramo"
                    aria-label="Escribe el nombre del paramo"
                    aria-describedby="button-addon2"
                    onChange={handleChange}
                    onClick={() => setIsShow(true)}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                  >
                    Search
                  </button>
                </div>

                <div
                  className="list-locations"
                  style={{ display: isShow ? "block" : "none" }}
                >
                  {resultSearchParams.map((e, i) =>
                    i < 5 ? (
                      <button key={e.name} onClick={() => getIds(e.id)}>
                        {e.name}
                      </button>
                    ) : null
                  )}
                </div>
              </div>

              <div className="cards">
                <div className="row">
                  {resultSearchParams.map((param, i) => (
                    <div key={i} className="col-xl-4 col-md-6 ">
                      <div className="contetCard">
                        <div className="cardParam">
                          <img
                            onClick={() => navigate(`/param/${param.id}`)}
                            src={param.img}
                            alt=""
                          />
                        </div>
                        <div className="nameParam">
                          <h1> {param.name}</h1>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="buttoms-next">
                <button
                  className="page-link"
                  href="#up"
                  type="button"
                  onClick={() => prevPage()}
                >
                  Anterior
                </button>

                <h1>Pagina {actualPage}</h1>
                <button
                  className="page-link"
                  href="#up"
                  type="button"
                  onClick={() => nextPage()}
                >
                  Siguiente
                </button>
              </div>
            </div>
            <div className="col-md-2">
              <div className="title-params">
                <h1> Lista de paramos</h1>
                <ul className="list-group list-group-flush">
                  {actualParamas.map((param, i) => (
                    <div key={i} className="list-reference-params">
                      <li className="list-group-item">{param.name}</li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
