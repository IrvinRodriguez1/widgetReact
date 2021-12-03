import React, {useState, useEffect} from  "react"
import axios from 'axios'


const Search = ()=>{
  
  const [term, setTerm] = useState('programing')
  const [debounceTerm, setDebounceTerm]= useState(term)
  const [results, setResults] = useState([])


  useEffect(()=>{
    const timerId= setTimeout(()=>{
      setDebounceTerm(term)
    }, 750)

    return ()=>{
      clearTimeout(timerId)
    }
  },[term])


  useEffect(()=>{
    const searchWiki = async ()=>{
      const {data}=await axios.get('https://en.wikipedia.org/w/api.php',
      {
        params: {
          action:'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: debounceTerm

        }
      })
        
      setResults(data.query.search)
    }

    searchWiki();

  }, [debounceTerm])



  const renderResults = results.map((item)=>{
    return(
      <div key={item.pageid} className='item'>
        <div className='right floated content'>
          <a className='ui button' href={`https://en.wikipedia.org?curid=${item.pageid}`}>GO</a>
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