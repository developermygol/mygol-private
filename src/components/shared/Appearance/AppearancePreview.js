import React from 'react';
import Loc from '../../common/Locale/Loc';

const AppearancePreview = ({ data, motto, name }) => {
  const bgColor = data && data.bgColor ? data.bgColor : '#5d5d81';
  const color1 = data && data.color1 ? data.color1 : '#e7a016';
  const color2 = data && data.color2 ? data.color2 : '#ffffff';
  const color3 = data && data.color3 ? data.color3 : '#ffffff';

  return (
    <div className="AppearancePreview" style={{ backgroundColor: bgColor }}>
      <div className="OrgName" style={{ color: color1 }}>
        {name}
      </div>
      <div className="OrgMotto" style={{ color: color2 }}>
        {motto && motto !== '' ? motto : 'Organization Motto'}
      </div>
      <div className="Menu" style={{ color: color1 }}>
        <Loc>Home</Loc> <Loc>Tournaments</Loc> <Loc>Contact</Loc>
      </div>
      <div className="Title" style={{ color: color1 }}>
        <Loc>Tournaments</Loc>
      </div>
      <div className="Title2" style={{ color: color2 }}>
        <Loc>Classification</Loc>
      </div>
      <div className="Text" style={{ color: color3 }}>
        <Loc>AppearancePreview.Text</Loc>
      </div>
    </div>
  );
};

export default AppearancePreview;
