import React, {useState } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

import './styles.css';
import Artistas from '../../../public/Images/Artistas.png';
import Search from '../../../public/Images/Search.png';
import UpArrow from '../../../public/Images/up-arrow.png';
import DownArrow from '../../../public/Images/down-arrow.png';
import trackService from '../../services/track';
import * as actionTracks from '../../actions/tracks';
import artistService from '../../services/artist';
import * as actionArtists from '../../actions/artists';
import albumService from '../../services/album';
import * as actionAlbums from '../../actions/albums';
import userService from '../../services/user';
import * as actionUsers from '../../actions/users';
import roleService from '../../services/role';
import * as actionRoles from '../../actions/roles';
import * as selectors from '../../reducers';
import * as actionCart from '../../actions/cart';
import jsPDF from 'jspdf'
import 'jspdf-autotable'




const Header = ({ onSearch, parentPage,user, cart, deleteToCart, clearCart }) => {
  const [searchInput, changeSearchInput] = useState('');
  const [showFilter, changeShowFilter] = useState(Boolean);
  const [genderInput, changeGenderInput] = useState('');
  const [artistInput, changeArtistInput] = useState('');
  const [albumInput, changeAlbumInput] = useState('');
  const [boughtInput, changeBoughtInput] = useState('1');
  //Se genera el total del carrito
  var total = 0;
  if(cart.length>0)
    cart.forEach(track => {
      total = total + parseFloat(track.unitprice);
    });
  //Funcion para generar PDF Invoice
  function generateInvoicePDF() {
    var doc = new jsPDF()
  
    // // Simple data example
    // var head = [['ID', 'Country', 'Rank', 'Capital']]
    // var body = [
    //   [1, 'Denmark', 7.526, 'Copenhagen'],
    //   [2, 'Switzerland', 7.509, 'Bern'],
    //   [3, 'Iceland', 7.501, 'Reykjavík'],
    // ]
    doc.setFontSize(18)
    doc.text('Recibo de Compra', 10, 10)
    doc.setFontSize(12)
    doc.text(`Usuario ${user.userid}`, 10, 20)
    doc.text(`Fecha ${(new Date()).toLocaleString()}`, 10, 25)
    let head = [['#','Nombre','Álbum','Género','Artista','Precio']]
    let body=cart.map((track, id) => [id+1,track.trackname,track.albumname,track.genrename,track.artistname,track.unitprice])
    doc.autoTable({ startY: 30,head: head, body: body })
    head = [['Cantidad','Total']]
    body = [[cart.length,total]]
    doc.autoTable({ head: head, body: body })
    
 
    doc.save('invoice.pdf')
  }
  //Funcion que genera el invoice
  const generateInvoice = () => {
    trackService.generateInvoice({cart:cart,user:user,total:total}).then(res=> {
      generateInvoicePDF();
      clearCart();
      document.getElementById('modal-cart').style.display = "none";
      onSearch(parentPage, searchInput, genderInput, artistInput, albumInput, user.userid, boughtInput);
    });
  }
  return (
    <div>    
      <div className="header">
        <div className="header-container" hidden={parentPage==="Reports" || parentPage==="Users" || parentPage==="Roles" || parentPage==="Simulation"} 
        onLoad={()=> onSearch(parentPage, searchInput, genderInput, artistInput, albumInput, user.userid, boughtInput)} > 
          <div className="header-initial-filter">
            {
              (parentPage!=="Artist")
              ? (
                <div className="header-search-filter" onClick={() => changeShowFilter(!showFilter)} >
                  <img alt="img" src={showFilter ? UpArrow : DownArrow} className="header-search-image"/>
                </div>
              )
              : (
                <div/>
              )
            }
            <input className="header-search-input"
                type="text"
                placeholder="Buscar"
                value={searchInput}
                onChange={e => changeSearchInput(e.target.value)}
            />
            <div className="header-search-button"
              onClick={() => onSearch(parentPage, searchInput, genderInput, artistInput, albumInput, user.userid, boughtInput)}>
              <img alt="img" src={Search} className="header-search-image"/>
            </div>
          </div>
          {
            (showFilter)
            ? (parentPage==="Tracks")
              ? (
                <div className="header-more-filters">
                  <input className="header-search-input"
                    type="text"
                    placeholder="Ingresa un género"
                    value={genderInput}
                    onChange={e => changeGenderInput(e.target.value)}
                  />
                  <input className="header-search-input"
                    type="text"
                    placeholder="Ingresa un artista"
                    value={artistInput}
                    onChange={e => changeArtistInput(e.target.value)}
                  />
                  <input className="header-search-input"
                    type="text"
                    placeholder="Ingresa un álbum"
                    value={albumInput}
                    onChange={e => changeAlbumInput(e.target.value)}
                  />
                  <select onChange={e => changeBoughtInput(e.target.value)} className="header-search-input" style={{height:'50px'}}>
                    <option value="1">Todas las canciones</option>
                    <option value="2">Canciones compradas</option>
                    <option value="3">Canciones no compradas</option>
                  </select>
                </div>
              )
              : (
                <div className="header-more-filters">
                  <input className="header-search-input"
                    type="text"
                    placeholder="Ingresa un artista"
                    value={artistInput}
                    onChange={e => changeArtistInput(e.target.value)}
                  />
                </div>
              )
            : (
              <div/>
            )
          }
        </div>
        <div className="header-user">
          <img alt="img" src={Artistas} className="user-image"/>
          <div className="header-user-info">
              {user.name + "  " + user.lastname}
          </div>
          {(parentPage!=="Users" && parentPage!=="Roles" && parentPage!=="Simulation") &&
            (<div className="header-cart-button" onClick={() => document.getElementById('modal-cart').style.display = "block"} >
              <i className="fa fa-shopping-cart fa-xs"></i>
            </div>)
          }
              
        </div>
      </div>

      {/* Modal de cart */}
      <div id="modal-cart" className="modal-cart">
        <div className="modal-cart-content">
          <span className="close-modal-cart" onClick={() => document.getElementById('modal-cart').style.display = "none"}>&times;</span>
          <h1 style={{margin:'2%',textAlign:'center'}}>
            <i className="fa fa-shopping-cart fa-xs"></i>
            {' Carrito'}
          </h1>
          <Table className='cart-content' size="sm" hover bordered id='trackTable'>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Álbum</th>
                <th>Género</th>
                <th>Artista</th>
                <th>Precio</th>
                <th>Eliminar del carrito</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((track, id) => 
                (
                  <tr key={id} className={"table-light"} >
                    <th scope="row">{id+1} </th>
                    <td>{track.trackname} </td>
                    <td>{track.albumname}</td>
                    <td>{track.genrename}</td>
                    <td>{track.artistname}</td>
                    <td>{track.unitprice}</td>
                    <td className='td-button'>
                      <div className="cart-delete-cart-button" onClick={() => deleteToCart(track.trackid)}>
                        <i className="fa fa-minus-circle fa-xs"></i>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
          <Table className='cart-content' size="sm" id="total">
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Precio Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{cart.length}</td>
                <td>{total}</td>
                <td className='td-button'>
                  {cart.length!==0 && <div className="cart-invoice-button"   onClick={() => generateInvoice()}>
                    {'Comprar canciones'}
                  </div>}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
} 


export default connect(
  state =>({
      user: selectors.getLoggedUser(state),
      cart: selectors.getTracksInCart(state),
  }),
  dispatch => ({
    onSearch(parentPage, searchInput, genderInput, artistInput, albumInput, userid, boughtInput) {
      //Se pasan todos los inputs a minusculas
      searchInput = searchInput.toLowerCase();
      genderInput = genderInput.toLowerCase();
      artistInput = artistInput.toLowerCase();
      albumInput = albumInput.toLowerCase();
      //Dependendo de en que pagina esta se llama a la base de datos
      if(parentPage==="Tracks")
        trackService.getTrackList({
          userid: userid,
          trackname:searchInput,
          genrename:genderInput,
          albumname:albumInput,
          onlyBought:boughtInput==='3'?false:true,
          onlyNotBought:boughtInput==='2'?true:null,
          artistname:artistInput,
          limit:"20"
        }).then(res=> {
            const trackList = res;
            dispatch(actionTracks.clearTracks());
            trackList.map( track => dispatch(actionTracks.addTrack(track)));
          });
      if(parentPage==="Artist") 
        artistService.getArtistList({
          artistname:searchInput,
          limit:"20"
        }).then(res=> {
          const artistList = res;
          dispatch(actionArtists.clearArtists());
          artistList.map( artist => dispatch(actionArtists.addArtist(artist)));
        });
      if(parentPage==="Album") 
        albumService.getAlbumList({
          albumname:searchInput,
          artistname:artistInput,
          limit:"20"
        }).then(res=> {
          const albumList = res;
          dispatch(actionAlbums.clearAlbums());
          albumList.map( album => dispatch(actionAlbums.addAlbum(album)));
        });
      if(parentPage==="Users") 
        userService.getUserListAll().then(res=> {
          const userList = res;
          dispatch(actionUsers.clearUsers());
          userList.map( user => dispatch(actionUsers.addUser(user)));
        });
      if(parentPage==="Roles") 
        roleService.getRoleListAll().then(res=> {
          const roleList = res;
          dispatch(actionRoles.clearRoles());
          roleList.map( role => dispatch(actionRoles.addRole(role)));
        });
    },
    deleteToCart(trackid) {
      dispatch(actionCart.deleteToCart(trackid));
    },
    clearCart() {
      dispatch(actionCart.clearCart());
    }
  }),
)(Header);
