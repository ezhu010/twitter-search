import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { computeHeadingLevel } from '@testing-library/react';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function App() {
  const [data, setData] = useState([]);
  const [userInput, setUserInput] = useState("")

  // id:::id:::id:::
  const getData = (userInput) => {
    setData([])
    axios.get(`http://localhost:8080/getTweets?name=${userInput}`).then(res => {
          console.log(res.data)
          var resTemp = res.data.split(":::")
          resTemp.pop()
          console.log(resTemp)
          setData(resTemp)

          return res.data
        }).catch(err => {
          console.error(err);
          return
        })
  }


  const handleSubmit = (e) => {
    console.log(userInput)
    getData(userInput)
    setUserInput("")
    e.preventDefault()
  }

  return (
    <div className="App">
        <h1 className="tweetSearcher">Tweet Searcher</h1>
      <div className="searchForm">
      <TextField
      id="search-bar"
      onInput={(e) => {
        setUserInput(e.target.value);
      }}
      label="Enter your query"
      variant="outlined"
      placeholder="Search..."
      size="medium"
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }}  onClick={handleSubmit} />
    </IconButton>
    </div>
    <div style = {{marginLeft:"650px", marginTop: "50px", width: "40%"}}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700, maxWidth: 800 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {/* <StyledTableCell>Document Score</StyledTableCell> */}
            <StyledTableCell align="center">Tweet</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row}>
              {/* <StyledTableCell component="th" scope="row">
                {parseFloat(row[0]).toPrecision(3)}
              </StyledTableCell> */}
              <StyledTableCell align="right"><TwitterTweetEmbed tweetId={row}/></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
  );
}

export default App;
