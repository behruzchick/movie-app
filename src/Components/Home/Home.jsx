import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Content, Heading, Media } from 'react-bulma-components';
import './Home.css'
import Header from '../Header/Header';
const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showStats, setShowStats] = useState(false);
    const [search,setSearch] = useState("");
    useEffect(() => {
        const options = { method: 'GET', headers: { accept: 'application/json' } };
        axios
            .get("https://api.themoviedb.org/3/discover/movie?api_key=cc85a84153d28f56eb51c62faefa9c2d", options)
            .then((res) => {
                console.log(res.data.results);
                setMovies(res.data.results)
                setLoading(false);
            }).catch((e) => {
                console.log(e);
            })
    }, [])

    const mouseLeave = () => {
        setShowStats(false)
    }

    const mouseMove = (itemId) => {

        setShowStats((prev) => ({
            ...prev,
            [itemId]: true
        }))
    }
    return (
        <div className='movies-wrape'>

            <Header setSearch={setSearch}/>

            {
                loading ? (
                    <h3>Loading...</h3>
                ) :
                
                    movies
                    .filter((item) => {
                        return search.toLowerCase() === ""
                        ? item
                        :item.title.toLowerCase().includes(search)
                    })
                    .map((item) => (
                        <Card key={item.id} className={showStats[item.id] ? 'multed-bg' : 'card-wrape'} onMouseMove={() => mouseMove(item.id)} onMouseLeave={mouseLeave} style={{ cursor: "pointer", position: "relative" }} key={item._id}>
                            <Card.Image src={'https://image.tmdb.org/t/p/w300/' + item.poster_path} />

                            <Card.Content className={showStats[item.id] ? 'card-content-animated' : 'card-content'}>
                                <Media className='card-media'>
                                    <Media.Item>
                                        <Heading style={{ color: "white",fontSize:'16px' }} className='item-title'>{item.title}</Heading>
                                        <Heading style={{ color: "white" ,fontSize:'15px'}} subtitle>{item.release_date}</Heading>
                                    </Media.Item>
                                    <Content className='movie-content' style={{ color: "white" }}>
                                        <p className='movie-desc'>
                                            {
                                                item.overview
                                            }
                                        </p>

                                        <p className='vouted-count'>
                                            {item.vote_count}
                                        </p>
                                    </Content>
                                </Media>
                            </Card.Content>

                        </Card>
                    ))
            }
        </div>
    )
}

export default Home