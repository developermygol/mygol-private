import React, { Component } from 'react';
import ApparelSvg from './ApparelSvg';
import InfoBox from '../../../../common/InfoBox';
import Loc from '../../../../common/Locale/Loc';

class ApparelWidget extends Component {
  render() {
    const { data } = this.props;
    if (!data)
      return (
        <InfoBox>
          <Loc>Error.Apparel.NoData</Loc>
        </InfoBox>
      );

    const apparelData = JSON.parse(data);

    return <ApparelSvg {...apparelData} />;
  }
}

export default ApparelWidget;
