import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { fetchData } from "../service"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './fooditem.css'

function RecipeLists(props) {
    const [searchedTearm, setSearchedTearm] = useState('')
    const [query, setQuery] = useState('pasta')
    const [data, setData] = useState('');
    const [favData, setFavData] = useState('');

    const searchrecipe = (searchQuery) => {
        fetchData(searchQuery).then((response) => {
            setData(response)
            props.setLoader(false)
        })
    }

    useEffect(() => {
        fetchData(query).then((response) => {
            setData(response)
            props.setLoader(false)
        })
    }, [])


    const addFav=(item, index)=>{
       
            setFavData({...favData,item})
    
    }
useEffect(()=>{
    localStorage.setItem('favouriteData', JSON.stringify(favData));
},[favData])

    return (
        <div className='container'>
            <div className='heading-line'>
                <strong>Search Recipes</strong>
                <div className='input-wrapper' >
                    <input
                        onChange={(e) => setSearchedTearm(e.target.value)}
                        value={searchedTearm}
                        type="text"
                        placeholder='Search you recipe' />
                    <button onClick={() => (searchrecipe(searchedTearm), props.setLoader(true))}><BsSearch /></button>
                </div>
            </div>
            <div className='flexbox'>
                {
                    data && data.hits.map((item, index) => (
                        <div key={index} className='flexItem'>
                            <div className='img-wrapper'>
                                <img src={item.recipe.image} alt={item.recipe.label} />
                            </div>
                            <div className='text-box'>
                                <p>{item.recipe.label}</p>
                                <button className="favorite-button"onClick={(e)=>addFav(item,index)}>
                                    <FontAwesomeIcon icon={faHeart} /> Add to Favorites
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RecipeLists
