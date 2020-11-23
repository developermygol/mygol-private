import React, { Component } from 'react';

const defProps = {
  color1: {type: 'color', caption: 'Logo.PrimaryColor', value: '#BA3E39'},
  color2: {type: 'color', caption: 'Logo.SecondaryColor', value: '#212121'},
  line1: { type: 'text', caption: 'Logo.Text1', value: 'CLUB'},
  line2: { type: 'text', caption: 'Logo.Text2', value: 'RECREATIVO'},
  line3: { type: 'text', caption: 'Logo.Text3', value: 'FÚTBOL' }
}

class Logo1 extends Component {

  
  render() {
    return (
    <svg version={1.0} id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 313.043 257.065" enableBackground="new 0 0 313.043 257.065" xmlSpace="preserve" 
    ref={c => {this.props.refContainer.target = c}}
    {...this.props.passProps}>
      <g>
        <circle fill={this.props.color2.value} stroke={this.props.color1.value} strokeWidth="3.6385" strokeMiterlimit={10} cx="156.615" cy="129.145" r="120.344" />
        <path id="SVGID_x5F_1_x5F_" fill="none" d="M250.76,129.145c0,51.996-42.15,94.146-94.146,94.146
        		c-51.996,0-94.146-42.15-94.146-94.146c0-51.995,42.15-94.146,94.146-94.146C208.61,34.999,250.76,77.15,250.76,129.145z" />
        <text>
          <textPath xlinkHref="#SVGID_x5F_1_x5F_" startOffset="62.5%">
            <tspan fill="#F5F5F5" fontFamily="'Arial'" fontSize="21.1358">{this.props.line2.value}</tspan>
          </textPath>
        </text>
        <g>
          <path id="SVGID_x5F_2_x5F_" fill="none" d="M268.954,129.145c0-62.042-50.296-112.338-112.339-112.338
          			c-62.042,0-112.338,50.296-112.338,112.338s50.296,112.337,112.338,112.337C218.658,241.482,268.954,191.188,268.954,129.145z" />
          <text>
            <textPath xlinkHref="#SVGID_x5F_2_x5F_" startOffset="65%">
          <tspan fill="#F5F5F5" fontFamily="'Arial'" fontSize="21.0124">{this.props.line3.value} {this.props.line1.value}</tspan>
            </textPath>
          </text>
        </g>
        <rect x="7.495" y="97.895" fill={this.props.color1.value} stroke={this.props.color2.value} strokeWidth="3.6385" strokeMiterlimit={10} width="298.24" height="62.5" />
        <circle fill={this.props.color1.value} stroke="#E0E0E0" strokeWidth="3.8204" strokeMiterlimit={10} cx="156.614" cy="129.145" r="86.362" />
        <g>
          <defs>
            <circle id="SVGID_3_" cx="156.614" cy="129.145" r="86.362" />
          </defs>
          <clipPath id="SVGID_4_">
            <use xlinkHref="#SVGID_3_" overflow="visible" />
          </clipPath>
          <g clipPath="url(#SVGID_4_)">
            <line fill="none" stroke="#E0E0E0" strokeWidth="4.5903" strokeMiterlimit={10} x1="50.001" y1="35.198" x2="50.001" y2="223.093" />
            <line fill="none" stroke="#E0E0E0" strokeWidth="4.5903" strokeMiterlimit={10} x1="60.155" y1="35.198" x2="60.155" y2="223.093" />
            <line fill="none" stroke="#E0E0E0" strokeWidth="4.5903" strokeMiterlimit={10} x1="70.309" y1="35.198" x2="70.309" y2="223.093" />
            <line fill="none" stroke="#E0E0E0" strokeWidth="4.5903" strokeMiterlimit={10} x1="80.462" y1="35.198" x2="80.462" y2="223.093" />
            <line fill="none" stroke="#E0E0E0" strokeWidth="4.5903" strokeMiterlimit={10} x1="90.616" y1="35.198" x2="90.616" y2="223.093" />
            <line fill="none" stroke="#E0E0E0" strokeWidth="4.5903" strokeMiterlimit={10} x1="100.77" y1="35.198" x2="100.77" y2="223.093" />
            <line fill="none" stroke="#E0E0E0" strokeWidth="4.5903" strokeMiterlimit={10} x1="110.923" y1="35.198" x2="110.923" y2="223.093" />
            <line fill="none" stroke="#E0E0E0" strokeWidth="4.5903" strokeMiterlimit={10} x1="121.077" y1="35.198" x2="121.077" y2="223.093" />
            <line fill="none" stroke="#E0E0E0" strokeWidth="4.5903" strokeMiterlimit={10} x1="131.23" y1="35.198" x2="131.23" y2="223.093" />
            <line fill="none" stroke="#E0E0E0" strokeWidth="4.5903" strokeMiterlimit={10} x1="141.384" y1="35.198" x2="141.384" y2="223.093" />
            <line fill="none" stroke="#E0E0E0" strokeWidth="4.5903" strokeMiterlimit={10} x1="151.538" y1="35.198" x2="151.538" y2="223.093" />
            <line fill="none" stroke="#E0E0E0" strokeWidth="4.5903" strokeMiterlimit={10} x1="161.692" y1="35.198" x2="161.692" y2="223.093" />
            <line fill="none" stroke="#E0E0E0" strokeWidth="4.5903" strokeMiterlimit={10} x1="171.844" y1="35.198" x2="171.844" y2="223.093" />
            <line fill="none" stroke="#E0E0E0" strokeWidth="4.5903" strokeMiterlimit={10} x1="181.999" y1="35.198" x2="181.999" y2="223.093" />
            <line fill="none" stroke="#E0E0E0" strokeWidth="4.5903" strokeMiterlimit={10} x1="192.153" y1="35.198" x2="192.153" y2="223.093" />
            <line fill="none" stroke="#E0E0E0" strokeWidth="4.5903" strokeMiterlimit={10} x1="202.306" y1="35.198" x2="202.306" y2="223.093" />
            <line fill="none" stroke="#E0E0E0" strokeWidth="4.5903" strokeMiterlimit={10} x1="212.459" y1="35.198" x2="212.459" y2="223.093" />
            <line fill="none" stroke="#E0E0E0" strokeWidth="4.5903" strokeMiterlimit={10} x1="222.613" y1="35.198" x2="222.613" y2="223.093" />
            <line fill="none" stroke="#E0E0E0" strokeWidth="4.5903" strokeMiterlimit={10} x1="232.767" y1="35.198" x2="232.767" y2="223.093" />
            <line fill="none" stroke="#E0E0E0" strokeWidth="4.5903" strokeMiterlimit={10} x1="242.921" y1="35.198" x2="242.921" y2="223.093" />
            <line fill="none" stroke="#E0E0E0" strokeWidth="4.5903" strokeMiterlimit={10} x1="253.075" y1="35.198" x2="253.075" y2="223.093" />
            <line fill="none" stroke="#E0E0E0" strokeWidth="4.5903" strokeMiterlimit={10} x1="263.228" y1="35.198" x2="263.228" y2="223.093" />
          </g>
        </g>
        <g>
          <circle fill="#E0E0E0" stroke={this.props.color1.value} strokeWidth="3.7922" strokeMiterlimit={10} cx="156.615" cy="129.145" r="67.312" />
          <g>
            <circle fill="#F5F5F5" stroke="#272424" strokeWidth="3.6385" strokeMiterlimit={10} cx="156.673" cy="129.124" r="55.249" />
            <polygon fill="#272424" stroke="#272424" strokeWidth="0.9096" strokeMiterlimit={10} points="152.919,149.972
            				136.105,132.411 147.611,110.992 171.538,115.317 174.817,139.408 			" />
            <path fill="#272424" stroke="#272424" strokeWidth="0.9096" strokeMiterlimit={10} d="M123.376,85.034l-1.001,10.878h18.779
            				l11.329-14.743l-7.493-6.056C144.99,75.113,134.309,77.26,123.376,85.034z" />
            <path fill="#272424" stroke="#272424" strokeWidth="0.9096" strokeMiterlimit={10} d="M101.635,124.304l8.946-6.82l9.312,15.83
            				l-6.053,18.002l-8.974-2.959C104.866,148.357,100.027,135.487,101.635,124.304z" />
            <path fill="#272424" stroke="#272424" strokeWidth="0.9096" strokeMiterlimit={10} d="M156.673,184.373l6.673-7.76
            				l-14.743-11.64l-17.847,4.19l1.578,9.569C132.333,178.733,148.402,184.988,156.673,184.373z" />
            <path fill="#272424" stroke="#272424" strokeWidth="0.9096" strokeMiterlimit={10} d="M197.853,165.952h-10.762l1.086-18.981
            				l15.364-11.019l6.092,8.949C209.633,144.901,207.063,155.137,197.853,165.952z" />
            <path fill="#272424" stroke="#272424" strokeWidth="0.9096" strokeMiterlimit={10} d="M188.536,83.984
            				c-0.504-0.294-10.912,3.083-10.912,3.083l5.456,17.848l17.823,6.828l3.918-9.729C204.821,102.013,196.928,88.871,188.536,83.984z
            				" />
            <line fill="#272424" stroke="#272424" strokeWidth="3.6385" strokeMiterlimit={10} x1="109.494" y1="121.488" x2="124.083" y2="93.584" />
            <line fill="#272424" stroke="#272424" strokeWidth="3.6385" strokeMiterlimit={10} x1="140.968" y1="95.479" x2="150.077" y2="115.85" />
            <line fill="#272424" stroke="#272424" strokeWidth="3.6385" strokeMiterlimit={10} x1="150.077" y1="81.06" x2="183.671" y2="88.773" />
            <line fill="#272424" stroke="#272424" strokeWidth="3.6385" strokeMiterlimit={10} x1="183.671" y1="104.38" x2="170.946" y2="115.85" />
            <line fill="#272424" stroke="#272424" strokeWidth="3.6385" strokeMiterlimit={10} x1="170.946" y1="138.088" x2="192.153" y2="149.382" />
            <line fill="#272424" stroke="#272424" strokeWidth="3.6385" strokeMiterlimit={10} x1="199.972" y1="109.606" x2="203.774" y2="138.088" />
            <line fill="#272424" stroke="#272424" strokeWidth="3.6385" strokeMiterlimit={10} x1="148.433" y1="165.563" x2="154.535" y2="143.269" />
            <line fill="#272424" stroke="#272424" strokeWidth="3.6385" strokeMiterlimit={10} x1="158.325" y1="178.491" x2="190.35" y2="164.198" />
            <line fill="#272424" stroke="#272424" strokeWidth="3.6385" strokeMiterlimit={10} x1="111.667" y1="148.213" x2="135.282" y2="173.337" />
            <line fill="#272424" stroke="#272424" strokeWidth="3.6385" strokeMiterlimit={10} x1="119.618" y1="133.33" x2="140.968" y2="132.396" />
          </g>
        </g>
        <g>
          <polygon fill="#F5F5F5" points="273.975,110.992 279.218,121.617 290.943,123.32 282.458,131.59 284.462,143.269 273.975,137.754
          			263.488,143.269 265.491,131.59 257.006,123.32 268.731,121.617 		" />
          <polygon fill="#F5F5F5" points="39.255,110.992 44.499,121.617 56.223,123.32 47.739,131.59 49.742,143.269 39.255,137.754
          			28.768,143.269 30.771,131.59 22.287,123.32 34.011,121.617 		" />
        </g>
      </g>
    </svg>
    );
  }
}

Logo1.defaultProps = defProps;

export default Logo1;