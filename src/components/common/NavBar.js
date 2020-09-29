import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Loc from './Locale/Loc';
import AccessLimit from './AccessLimit';

class NavBar extends Component {
  render() {
    return (
      <nav className="NavBar">
        <div className="Logo"></div>

        {/* <div className='SearchBox'>
                    <Loc>Search</Loc>...
                </div> */}

        <ul className="Items">
          <li>
            <NavLink className="NavBarLink" to="/" exact>
              <Loc>Home</Loc>
            </NavLink>
          </li>
          <AccessLimit allowOrgAdmin>
            <li>
              <NavLink className="NavBarLink" to="/tournaments">
                <Loc>Tournaments</Loc>
              </NavLink>
            </li>
            <li>
              <NavLink className="NavBarLink" to="/calendar">
                <Loc>Calendar</Loc>
              </NavLink>
            </li>
            <li>
              <NavLink className="NavBarLink" to="/facilities">
                <Loc>Facilities</Loc>
              </NavLink>
            </li>
            <li>
              <NavLink className="NavBarLink" to="/referees">
                <Loc>Referees</Loc>
              </NavLink>
            </li>
            <li>
              <NavLink className="NavBarLink" to="/content">
                <Loc>Content management</Loc>
              </NavLink>
            </li>
          </AccessLimit>
          <li>
            <NavLink className="NavBarLink" to="/notifications">
              <Loc>Notifications</Loc>
            </NavLink>
          </li>
          <AccessLimit allowOrgAdmin>
            <li>
              <NavLink className="NavBarLink" to="/config/org">
                <Loc>Configuration</Loc>
              </NavLink>
            </li>
          </AccessLimit>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
