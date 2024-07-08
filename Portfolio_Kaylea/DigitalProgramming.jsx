import React, { Suspense, useEffect, useState } from "react";
import PlaylistComponent from "./Playlist/PlaylistComponent";
import './DigitalProgrammingStyling.css';

function DigitalProgramming() {

    const [playlists, setPlaylists] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    async function fetchPlaylists() {
        if (isFetched === false) {
            fetch("API.URL")
                .then(res => res.json())
                .then((result) => {
                    if (result) {
                        var parsed = JSON.parse(JSON.stringify(result));
                        setPlaylists(parsed);
                        setIsFetched(true);
                    }
                }, (error) => {
                    throw Error(error);
                });
        }
    }

    function convertJsonToArray(jsonObject) {
        const newArr = [];
        jsonObject = Object.entries(jsonObject);
        jsonObject.forEach(element => {
            newArr.push(element[1]);
        });
        return newArr;
    }

    useEffect(() => {
        fetchPlaylists();
    }, [])

    if (isFetched) {
        const PlaylistComponents = convertJsonToArray(playlists.Playlists).map(entry => (
            <PlaylistComponent data={entry} key={entry.id} />
        ));
        return (
            <div className="DigitalProgramming">
                <h1> Digital Programming </h1>
                <div className="Playlists">
                    <h3>Playlists</h3>
                    <Suspense fallback={<Loading />}>
                    {PlaylistComponents}
                    </Suspense>
                </div>
            </div>
        );
    }
}

function Loading()
{
  return (
    <>
        <h2>Loading...</h2>
    </>
  );  
}

export default DigitalProgramming;