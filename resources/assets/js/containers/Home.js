import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                {/* TODO: Just display svg logo with spinner while images are loading */}

                <div className="home-fold">
                    <div className="logo-container">
                        <img alt="bbevents logo" src="/images/textlogo.png" className="fold-logo" />
                        <h4 className="tagline">CONFERENCE APPS MADE EASY</h4>
                        {/* TODO: get started button */}
                        <Button bsStyle="primary" onClick={() => this.props.history.push('/register')}>
                            Get Started
                        </Button>
                    </div>
                </div>

                <div className="home-container">
                    <div className="screenshot-container">
                        <img className="home-screenshot" alt="screenshot bbevents dashboard" src="/images/web-screenshot.png" />
                    </div>
                    <div className="screenshot-left-bullits">
                        <h3>Made Easy</h3>
                        <p>
                            BBEvents stands for Bare Basics Events. This doesn't mean our platform isn't enough to suit your needs.
                            It means we want to do away with all the marketing talk, the data collection and
                            the huge analytics platforms.
                        </p>
                        <p>
                            This means you get more time to spend on what's actually important: organising your event.
                            The fact that the platform is so compact also means we can get rid of the
                            dozens of pricing tiers and offer it for one simple price: free.
                        </p>
                    </div>
                </div>

                <div className="home-container-2">
                    <h3>Features</h3>
                    <div className="flex-row">
                        <div className="flew-row-item">
                            <h5>Web Platform</h5>
                            <p><Glyphicon glyph="ok" /> Create events that will be available on the mobile app immediately</p>
                            <p><Glyphicon glyph="ok" /> Edit your event's title, logo, description, dates, address...</p>
                            <p><Glyphicon glyph="ok" /> Create as many sessions as you'd like...</p>
                            <p><Glyphicon glyph="ok" /> with as many speakers as you'd like</p>
                            <p><Glyphicon glyph="ok" /> Showcase your sponsors in different tiers</p>
                            <p><Glyphicon glyph="ok" /> All this in a user-friendly and secure dashboard</p>
                        </div>
                        <div className="flew-row-item">
                            <h5>Mobile App</h5>
                            <p><Glyphicon glyph="ok" /> Create and edit your profile, include everything you need for people to contact you... or not</p>
                            <p><Glyphicon glyph="ok" /> Explore upcoming events, see what they have to offer and sign yourself up to them</p>
                            <p><Glyphicon glyph="ok" /> See who will attend the event and who will be holding a session</p>
                            <p><Glyphicon glyph="ok" /> Find the sessions you want to attend</p>
                            <p><Glyphicon glyph="ok" /> Find out what companies are sponsoring the event and making sure it can exist</p>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
