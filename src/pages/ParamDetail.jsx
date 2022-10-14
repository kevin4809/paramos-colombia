import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import params from "../json/paramsInfo.json";
import { infoAllParams } from "../utils/paramsInfo";

const ParamDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [param, setParam] = useState([]);

  const [paramSuggestion, setParamSuggestion] = useState([]);

  useEffect(() => {
    setParam(
      infoAllParams?.find((obj) => {
        return obj.id === parseInt(id, 10);
      })
    );
  }, [id]);

  // const generateRandomParamsArray = () => {

  // };

  useEffect(() => {
    const randomParam = infoAllParams?.map((obj) => {
      return obj;
    });
    
    const generateParamSuggestions = [];
    let isRepeat = false;

    for (let i = 1; i < 6; i++) {
      let random = randomParam[Math.floor(Math.random() * randomParam.length)];
      for (let a = 0; a < generateParamSuggestions.length; a++) {
        if (random?.id === generateParamSuggestions[a]?.id) {
          isRepeat = true;
          break;
        } else {
          isRepeat = false;
        }
      }

      if (!isRepeat) {
        generateParamSuggestions.push(random);
      } else {
        i = i - 1;
      }
    }

    setParamSuggestion(generateParamSuggestions);
  }, []);

  return (
    <div className="container-sm all-contet">
      <div className="container">
        <h1 className="text-center title-param-detail">{param.name}</h1>
        <p className="text-info-param-detail">{param.info}</p>

        <div className="part-two-img text-center">
          <img className="img-fluid img" src={param.img} alt="" />
        </div>
      </div>

      <div className="cards-suggestion-content row">
        <h1 className="text-center">Otros paramos</h1>

        {paramSuggestion.map((param, i) => (
          <div key={i} className="col-md-2  cont-suggestion-card">
            <img
              className="img-param-suggestion"
              onClick={() => navigate(`/param/${param.id}`)}
              src={param.img}
              alt=""
            />

            <h1> {param.name}</h1>
          </div>
        ))}
      </div>

      <div className="button-back">
        <button type="button" onClick={() => navigate("/")}>
          Regresar
        </button>
      </div>
    </div>
  );
};

export default ParamDetail;
