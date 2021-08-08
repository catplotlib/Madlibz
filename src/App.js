import { useEffect, useState } from "react";

import vidPhone from "./assets/phone.mp4";

let arr = [];

function App() {
  const [blanks, setBlanks] = useState([]);
  const [body, setBody] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3800);
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch("https://madlibz.herokuapp.com/api/random");
      const data = await response.json();
      setBlanks(data.blanks);
      setBody(data.value);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const All = e.target.elements;
    for (var i = 0; i < All.length; i++) {
      arr.push(All[i].value);
    }

    setSubmit(true);
  };

  return (
    <div className="container">
      {loading === true ? (
        <video src={vidPhone} autoPlay loop muted />
      ) : (
        <div className="card">
          {!submit ? (
            <>
              <center>
                <h1>Fill in the gaps!</h1>
              </center>
              <form onSubmit={handleSubmit}>
                {blanks.map((blank, index) => {
                  return (
                    <div className="hero">
                      <div>
                        <p className="pb">{blank}</p>
                      </div>
                      <div>
                        <input
                          id={index}
                          key={index}
                          type="text"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  );
                })}
                <div className="btn">
                  <button type="submit">Lets find out!</button>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="mad">
                {body.map((b, index) => {
                  return (
                    <>
                      {b}
                      <span className="spc">{arr[index]}</span>
                    </>
                  );
                })}
                <br />
                {/* <center>
                  <button onClick={() => window.location.reload(false)}>
                    Try one more!
                  </button>
                </center> */}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
