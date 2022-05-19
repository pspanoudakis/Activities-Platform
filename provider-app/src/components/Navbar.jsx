import React, { useContext } from 'react'
//import { Link, } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { TileButton } from './TileButton';

export function Navbar(props) {

    const context = useContext(AppContext);

    return (
        <div className='flex w-full justify-center p-1'>
            <div style={
                {
                    display: "flex",
                    flexDirection: "row",
                    color: "white",
                    justifyContent: "space-between",
                    width: "100%"
                }
            }>
                <TileButton stretch={false} content="Home" bgColor="bg-red-400" isLink={true} callback={() => context.state.navigate("/")}/>
                <TileButton stretch={false} content="Users" bgColor="bg-red-600" isLink={true} callback={() => context.state.navigate("/users")}/>
            </div>
        </div>
    );
}
