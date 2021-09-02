import React, { Component } from "react";
import Logo from "../logo.inline.svg";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import bedfordshire from "../data/bedfordshire";
import buckinghamshire from "../data/buckinghamshire";
import cambridgeshire from "../data/cambridgeshire";
import cheshire from "../data/cheshire";
import cleveland from "../data/cleveland";
import cornwall from "../data/cornwall";
import cumbria from "../data/cumbria";
import derbyshire from "../data/derbyshire";
import devon from "../data/devon";
import dorset from "../data/dorset";
import durham from "../data/durham";
import essex from "../data/essex";
import gloucestershire from "../data/gloucestershire";
import hampshire from "../data/hampshire";
import hertfordshire from "../data/hertfordshire";
import ireland from "../data/ireland";
import isleOfMan from "../data/isleOfMan";
import kent from "../data/kent";
import lancashire from "../data/lancashire";
import leicestershire from "../data/leicestershire";
import lincolnshire from "../data/lincolnshire";
import london from "../data/london";
import merseyside from "../data/merseyside";
import norfolk from "../data/norfolk";
import northamptonshire from "../data/northamptonshire";
import northumberland from "../data/northumberland";
import nottinghamshire from "../data/nottinghamshire";
import oxfordshire from "../data/oxfordshire";
import rutland from "../data/rutland";
import scotland from "../data/scotland";
import shropshire from "../data/shropshire";
import somerset from "../data/somerset";
import staffordshire from "../data/staffordshire";
import suffolk from "../data/suffolk";
import surrey from "../data/surrey";
import sussex from "../data/sussex";
import tyneAndWear from "../data/tyneAndWear";
import wales from "../data/wales";
import warwickshire from "../data/warwickshire";
import westMidlands from "../data/westMidlands";
import wiltshire from "../data/wiltshire";
import worcestershire from "../data/worcestershire";
import yorkshire from "../data/yorkshire";
import { styles } from "../styles";
const capitalise = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
export default class extends Component {
  componentDidMount() {
    window.initMap = () => {
      const { google } = window;
      const center = { lat: 53.3049009, lng: -1.3758539 };
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center,
        styles,
      });
      let markers = [];
      const iconWindmill = {
        url: "./icon-windmill.png",
        size: new google.maps.Size(26, 30),
        scaledSize: new google.maps.Size(26, 30),
        anchor: new google.maps.Point(26 / 2, 30 / 2),
        labelOrigin: new google.maps.Point(26 / 2, 34),
      };
      // console.log(southYorkshire);
      [
        ...bedfordshire,
        ...buckinghamshire,
        ...cambridgeshire,
        ...cheshire, // *
        ...cleveland,
        ...cornwall,
        ...cumbria,
        ...derbyshire, // *
        ...devon,
        ...dorset,
        ...durham,
        ...essex,
        ...gloucestershire,
        ...hampshire,
        ...hertfordshire,
        ...ireland,
        ...isleOfMan,
        ...kent,
        ...lancashire, // *
        ...leicestershire, // *
        ...lincolnshire, // *
        ...london,
        ...merseyside,
        ...norfolk,
        ...northamptonshire,
        ...northumberland,
        ...nottinghamshire, // *
        ...oxfordshire,
        ...rutland,
        ...scotland,
        ...shropshire,
        ...somerset,
        ...staffordshire,
        ...suffolk,
        ...surrey,
        ...sussex,
        ...tyneAndWear,
        ...wales,
        ...warwickshire,
        ...westMidlands,
        ...wiltshire,
        ...worcestershire,
        ...yorkshire, // *
      ].forEach(({ condition, lat, lng, location, name, type, url }) => {
        if (!lat || !lng) return;
        const marker = new google.maps.Marker({
          position: { lat, lng },
          map,
          // label: name, // too much..
          icon: iconWindmill,
          url,
        });
        markers.push(marker);
        const infowindow = new google.maps.InfoWindow({
          // content: JSON.stringify({
          //   condition,
          //   lat,
          //   lng,
          //   location,
          //   name,
          //   type,
          //   url,
          // }),
          content: `
          <div class="infowindow">
          ${name ? `<h2>${name}</h2><br />` : ``}
          ${type ? `Type: ${capitalise(type)}<br />` : ``}
          ${lat && lng ? `GPS: ${lat},${lng}<br />` : ``}
          ${condition ? `Condition: ${capitalise(condition)}<br />` : ``}
          <br />
          ${
            url
              ? `<a href="${url}" target="_blank">» Windmill World</a><br />`
              : ``
          }${
            lat && lng
              ? `<a href="https://www.google.com/maps/search/${lat},${lng}" target="_blank">» Google Maps</a><br />`
              : ``
          }
          </div>`,
        });
        // google.maps.event.addListener(marker, "click", (e) => {
        //   window.location.href = marker.url;
        // });
        marker.addListener("click", () => {
          infowindow.open(map, marker);
        });
      });
      //
      const input = document.getElementById("pac-input"); // not .. how you do it but
      const searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      // Bias the SearchBox results towards current map's viewport.
      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
      });
      searchBox.addListener("places_changed", () => {
        // It'll find a bunch of places in a little area, so just let it zoom the map with those various places as the bounds but don't bother with icons
        const places = searchBox.getPlaces();
        if (places.length == 0) {
          return;
        }
        const bounds = new google.maps.LatLngBounds();
        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }
          const icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25),
          };
          // markers.push(
          //   new google.maps.Marker({
          //     map,
          //     icon,
          //     title: place.name,
          //     position: place.geometry.location,
          //   })
          // );
          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    };
  }
  render() {
    return (
      <>
        <Helmet>
          <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD968Zkqu1mOL8D_F_JDWAeX72-JUBp4ok&libraries=places&callback=window.initMap"
            defer
          />
        </Helmet>
        <header className="header">
          <a
            target="_blank"
            href="http://michaelcook.tech"
            alt="MichaelCook.tech"
            className="logo"
          >
            {/* <img src={Logo} title="MichaelCook.tech" className="logo" /> */}
            <Logo />
          </a>
        </header>
        <main>
          <div id="map" />
          <input id="pac-input" type="text" placeholder="Search" />
        </main>
        <footer>© MichaelCook.tech {new Date().getFullYear()}</footer>
      </>
    );
  }
}
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          # date(formatString: "DD MMM YYYY")
          # description
          # tags
          # images {
          #   publicURL
          #   childImageSharp {
          #     fixed(width: 400, height: 250) {
          #       # ...GatsbyImageSharpFixed
          #       ...GatsbyImageSharpFixed_tracedSVG
          #     }
          #   }
          # }
        }
      }
    }
  }
`;
