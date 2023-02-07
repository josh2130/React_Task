import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { MathJaxContext, MathJax } from "better-react-mathjax";

function App() {
  const [page, setPage] = useState(1);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    if (page || page != 0) {
      getQuestion(page);
    }
  }, [page]);

  const getQuestion = async (pageNo) => {
    try {
      const url = `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=AreaUnderTheCurve_${pageNo}`;
      const res = await axios.get(url);
      if (res.status === 200) {
        setQuestion(await res.data[0]?.Question);
      }
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h3>Question {page}</h3>
      <br />
      <div className="question-section">
        {question ? (
          <MathJaxContext>
            <MathJax dynamic>{question}</MathJax>
          </MathJaxContext>
        ) : (
          "loading"
        )}
        <br />
        <div className="action-buttons">
          {page > 1 && <span onClick={() => setPage(page - 1)}>Previous</span>}
          {page < 5 && <span onClick={() => setPage(page + 1)}>Next</span>}
        </div>
      </div>
    </div>
  );
}

export default App;
