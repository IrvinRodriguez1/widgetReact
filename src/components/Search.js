import React, {useState, useEffect} from  "react"
import axios from 'axios'


const Search = ()=>{
  
  const [term, setTerm] = useState('')
  const [results, setResults] = useState([])

  useEffect(() =>{
    const searchWiki = async ()=>{
      const {data}=await axios.get('https://en.wikipedia.org/w/api.php',
      {
        params: {
          action:'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: term

        }
      })
        
      setResults(data.query.search)
    }
    

    const timeOutID= setTimeout(()=>{
      if(term){
        searchWiki()
      }
    },750)
   
    return ()=>{
      clearTimeout(timeOutID)
    }
  }, [term])

  const renderResults = results.map((item)=>{
    return(
      <div key={item.pageid} className='item'>
        <div className='right floated content'>
          <a className='ui button' href={`https://en.wikipedia.org?curtid=${item.pageid}`}>GO</a>
        </div>
        <div className='content'>
          <div className='header'>
            {item.title}
          </div>
          <span dangerouslySetInnerHTML={{__html: item.snippet}} ></span>
          
        </div>
      </div>
    )
  })

  return(
    <div>
      <div className='ui form'>
        <div className='field'>
          <label>Enter Search Term</label>
          <input className='input' 
            value={term}
            onChange={(e)=>{setTerm(e.target.value)}}
            
          />
        </div>
      </div>
      <div className='ui celled list'>
        {renderResults}
      </div>
    </div>
  )
}

export default Search;