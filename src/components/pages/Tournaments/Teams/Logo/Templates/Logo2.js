import React, { Component } from 'react';

const defProps = {
  color1: {type: 'color', caption: 'Logo.PrimaryColor', value: '#FF0000'},
  color2: {type: 'color', caption: 'Logo.SecondaryColor', value: '#212121'},
  line1: { type: 'text', caption: 'Logo.Text1', value: 'CLUB'},
  line2: { type: 'text', caption: 'Logo.Text2', value: 'RECREATIVO'},
  line3: { type: 'text', caption: 'Logo.Text3', value: 'FÚTBOL' }
}

class Logo2 extends Component {
  
  render() {
    return (
    <svg 
      version={1.0} 
      id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
      xmlnsXlink="http://www.w3.org/1999/xlink" 
      x="0px" 
      y="0px" 
      viewBox="0 0 325.98 378.919" 
      enableBackground="new 0 0 325.98 378.919" 
      xmlSpace="preserve" 
      
      ref={c => {this.props.refContainer.target = c}}
      {...this.props.passProps}
    >
      <g>
        <g>
          <g>
            <polygon fill={this.props.color2.value} stroke="#F5F5F5" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} points="
            				284.998,292.376 227.588,292.376 227.588,255.976 284.998,255.976 270.646,274.176 			" />
            <polygon fill={this.props.color2.value} stroke="#F5F5F5" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} points="
            				40.492,255.976 97.902,255.976 97.902,292.376 40.492,292.376 54.844,274.176 			" />
          </g>
          <line fill={this.props.color2.value} stroke="#F5F5F5" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} x1="75.789" y1="271.693" x2="97.902" y2="255.976" />
          <line fill={this.props.color2.value} stroke="#F5F5F5" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} x1="227.588" y1="255.976" x2="249.702" y2="271.693" />
        </g>
        <path fill={this.props.color1.value} d="M192.373,264.488c43.113-14.68,67.696-64.427,53.084-111.411c-5.17-16.619-13.506-37.107-24.227-51.053
        		c-12.99-16.897-21.602-25.734-38.092-42.763c5.56,13.687,10.494,27.808,11.551,42.59c0.12,1.683,0.061,6.257-1.682,7.479
        		c-6.557,4.596-14.292-9.411-19.59-16.352c-7.765-10.169-25.105-52.45-8.535-85.024c-14.889,11.738-21.459,26.231-22.654,41.799
        		c-1.052,13.703,2.077,27.778,3.903,41.62c1.892,14.347,5.333,44.386,4.455,52.009c-0.798,6.918-4.083,17.168-14.53,14.595
        		c-10.646-2.622-8.369-11.573-6.249-19.615c4.246-16.109,9.259-32.116,3.835-48.516c-11.086,27.14-31.056,42.565-44.213,62.111
        		c-29.494,43.817-8.759,94.529,39.618,112.612c-9.504-10.273-23.082-24.049-27.339-39.036c-4.94-17.39,0.528-53.173,11.315-66.677
        		c3.345,12.426,10.472,30.105,20.907,31.979c7.765,1.394,20.181-3.77,25.077-10.86c8.034-11.635,9.305-42.955,10.087-55.627
        		c17.191,23.301,25.529,35.616,34.94,70.99c1.272,4.78-23.332,28.778-22.538,33.865c0.751,4.811-6.152-10.589-2.811-7.351
        		c2.663,2.581,7.316,2.402,9.707-0.787c3.652-4.876,3.932-9.909,3.428-16.323c-0.793-10.079-2.902,8.904-4.74-0.957
        		C210.712,233.322,184.392,237.665,192.373,264.488z" />
        <g>
          <circle fill="#E0E0E0" stroke="#272424" strokeWidth="4.2403" strokeMiterlimit={10} cx="162.745" cy="235.436" r="73.5" />
          <g>
            <circle fill="#F5F5F5" stroke="#272424" strokeWidth={4} strokeMiterlimit={10} cx="162.806" cy="235.413" r="58.026" />
            <polygon fill="#272424" stroke="#272424" strokeWidth={4} strokeMiterlimit={10} points="158.864,257.31 141.205,238.865
            				153.289,216.37 178.418,220.912 181.863,246.214 			" />
            <path fill="#272424" stroke="#272424" strokeWidth={4} strokeMiterlimit={10} d="M127.835,189.107l-1.051,11.425h19.722
            				l11.898-15.484l-7.869-6.36C150.536,178.688,139.318,180.942,127.835,189.107z" />
            <path fill="#272424" stroke="#272424" strokeWidth={4} strokeMiterlimit={10} d="M105.001,230.352l9.396-7.163l9.78,16.626
            				l-6.357,18.907l-9.425-3.107C108.395,255.614,103.313,242.096,105.001,230.352z" />
            <path fill="#272424" stroke="#272424" strokeWidth={4} strokeMiterlimit={10} d="M162.807,293.439l7.008-8.149l-15.484-12.225
            				l-18.744,4.4l1.657,10.051C137.244,287.517,154.12,294.086,162.807,293.439z" />
            <path fill="#272424" stroke="#272424" strokeWidth={4} strokeMiterlimit={10} d="M206.057,274.093h-11.303l1.141-19.935
            				l16.137-11.573l6.396,9.399C218.428,251.984,215.729,262.733,206.057,274.093z" />
            <path fill="#272424" stroke="#272424" strokeWidth={4} strokeMiterlimit={10} d="M196.271,188.004
            				c-0.529-0.308-11.46,3.238-11.46,3.238l5.73,18.744l18.719,7.172l4.113-10.219C213.373,206.939,205.085,193.138,196.271,188.004z
            				" />
            <line fill="#272424" stroke="#272424" strokeWidth={4} strokeMiterlimit={10} x1="113.256" y1="225.634" x2="128.578" y2="198.088" />
            <line fill="#272424" stroke="#272424" strokeWidth={4} strokeMiterlimit={10} x1="144.909" y1="196.935" x2="154.152" y2="220.058" />
            <line fill="#272424" stroke="#272424" strokeWidth={4} strokeMiterlimit={10} x1="155.879" y1="184.934" x2="191.162" y2="193.035" />
            <line fill="#272424" stroke="#272424" strokeWidth={4} strokeMiterlimit={10} x1="191.162" y1="209.427" x2="177.796" y2="221.472" />
            <line fill="#272424" stroke="#272424" strokeWidth={4} strokeMiterlimit={10} x1="176.436" y1="242.585" x2="200.955" y2="256.824" />
            <line fill="#272424" stroke="#272424" strokeWidth={4} strokeMiterlimit={10} x1="208.281" y1="214.914" x2="212.275" y2="244.829" />
            <line fill="#272424" stroke="#272424" strokeWidth={4} strokeMiterlimit={10} x1="154.152" y1="273.685" x2="160.633" y2="251.389" />
            <line fill="#272424" stroke="#272424" strokeWidth={4} strokeMiterlimit={10} x1="167.859" y1="285.399" x2="198.176" y2="272.25" />
            <line fill="#272424" stroke="#272424" strokeWidth={4} strokeMiterlimit={10} x1="115.538" y1="255.462" x2="135.994" y2="277.896" />
            <line fill="#272424" stroke="#272424" strokeWidth={4} strokeMiterlimit={10} x1="120.917" y1="239.83" x2="144.909" y2="238.771" />
          </g>
        </g>
        <text x="162.5" y="370" textAnchor="middle" fill="#272424" fontFamily="Arial" fontSize="30.7556">{this.props.line3.value}</text>
        <polygon fill={this.props.color2.value} stroke="#F5F5F5" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} points="
        		234.07,310.659 91.42,310.659 75.789,271.693 249.702,271.693 	" />
        <text x="162.5" y="301" textAnchor="middle" fill="#F5F5F5" fontFamily="Arial" fontSize="23.5793">{this.props.line1.value}</text>
        <g>
          <polygon fill={this.props.color1.value} points="263.586,310.294 267.881,318.996 277.484,320.392 270.535,327.165 272.176,336.73
          			263.586,332.214 254.996,336.73 256.637,327.165 249.688,320.392 259.291,318.996 		" />
          <polygon fill={this.props.color1.value} points="61.904,310.294 66.199,318.996 75.803,320.392 68.854,327.165 70.494,336.73 61.904,332.214
          			53.314,336.73 54.955,327.165 48.006,320.392 57.609,318.996 		" />
        </g>
        {/* <text transform="matrix(1 0 0 1 81.6519 335.5371)" fill={this.props.color1.value} fontFamily="Arial" fontSize={21}>{this.props.line2.value}</text> */}
        <text x="162.5" y="335" textAnchor="middle" fill={this.props.color1.value} fontFamily="Arial" fontSize={21}>{this.props.line2.value}</text>
      </g>
    </svg>
    );
  }
}

Logo2.defaultProps = defProps;

export default Logo2;