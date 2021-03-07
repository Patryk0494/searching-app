import React from 'react'
import Search from '../Search/Search'
import './LandingPage.css'

export default function LandingPage() {
    return (
        <div className='landing-page'>
            <div className='landing-page__content'>
                <h1 className='landing-page__headline'>Unsplash</h1>
                <p className='landing-page__paragraph'>
                    The internet's source of freely-usable images.
                    <span>Powered by creators eweryvhere.</span>
                </p>
                <Search inputClass={'landing-page__search-input'}/>
            </div>
        </div>
    )
}
