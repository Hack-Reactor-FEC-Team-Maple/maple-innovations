import React, {useState, useEffect} from "react";
import axios from 'axios';
import SearchQuestions from "./SearchQuestions";
import QuestionList from "./QuestionList/QuestionList";
import QuestionListEntry from "./QuestionList/QuestionListEntry";
import config from "../../../../config.js"
import styled from "styled-components";

const BasicStyle = styled.div`
  color: #3a3b3c;
  font-family: sans-serif;
  background-color: transparent;
  margin: 40px;
  padding: 0.25em 1em;
`;

const Header = styled.p`
  padding-top: 3em;
  font-size: 3rem;
`;

const QuestionsAndAnswers = (props) => {
  const [productID, setProductID] = useState(37316); //props.currentProductID
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(5);
  const [questionData, setQuestionData] = useState();
  const [filteredData, setFilteredData] = useState(questionData);
  const [highlightedString, setHighlightedString] = useState('');

  useEffect(() => {
    axios.get(`/qa/questions?product_id=${productID}&page=${page}&count=${pageCount}`)
    .then(results => {
      setQuestionData(results.data.results);
      setFilteredData(results.data.results)
    })
  }, [productID]);


  const onSearchKeystroke = (e) => {
    e.preventDefault();
    var userSearch = e.target.value;
    var results = [];

    if (userSearch.length >= 3) {
      setHighlightedString(userSearch);
      questionData.map((questionObj) => {
        let lowercaseQuestion = questionObj.question_body.toLowerCase();
        if (lowercaseQuestion.includes(userSearch)) {
          results.push(questionObj);
        }
        Object.values(questionObj.answers).map((answer) => {
          let lowercaseAnswer = answer.body.toLowerCase();
          if (lowercaseAnswer.includes(userSearch)) {
            results.push(questionObj);
          }
        })
      })
      setFilteredData(results);
    } else {
      setFilteredData(questionData);
      setHighlightedString('')
    }
  };

    return (
      <BasicStyle>
        <Header> Questions & Answers </Header>
        <div className="questions-and-answers-container">
          <div className="questions-and-answers-components-container">
            <SearchQuestions onSearchKeystroke={onSearchKeystroke}/>
            {questionData && filteredData ? <QuestionList questionData={filteredData} highlightedString={highlightedString}/> : null}
          </div>
        </div>
      </BasicStyle>
    )
}

export default QuestionsAndAnswers;
