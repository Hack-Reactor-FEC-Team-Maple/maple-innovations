import React from "react";
import styled from "styled-components";

const SearchDiv = styled.div`
  background: transparent;
  color: #3a3b3c;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

const SearchQuestions = (props) => {

  return (
      <SearchDiv>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("submitted form!")
            //PLACEHOLDER - write a method for this on root component
          }}
          >
          <label>
            <input
              type="text"
              placeholder="Have a question? Search for answers"
            />
          </label>
          <button>
            search icon
          </button>
        </form>
      </SearchDiv>
    );
}

export default SearchQuestions;

/*

TODO :
  - import icons here
  - add onChange and onClick functionality

*/

