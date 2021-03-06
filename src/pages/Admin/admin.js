import React, { useState, useEffect } from 'react';
import './adminstyles.scss';
import Button from '../../components/forms/Buttons/Buttons';
import FormSelect from '../../components/forms/FormSelect/formselect';
import FormInput from '../../components/forms/FormInput/forminput';
import Modal from '../../components/Modals/modal';
import { useDispatch, useSelector } from 'react-redux';
import { addProductStart, deleteProductStart, fetchProductsStart } from './../../redux/Products/products.actions';
import LoadMore from '../../components/LoadMore/loadmore';
import { CKEditor } from 'ckeditor4-react';

const mapState = ({ productsData }) => ({
  products: productsData.products
});

const Admin = props => {
  const { products } = useSelector(mapState) 
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState('mens');
  const [productName, setProductName] = useState('');
  const [productThumbnail, setProductThumbnail] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState('');

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(
      fetchProductsStart()
    );

  }, []);

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal
  };

  const resetForm = () => {
    setHideModal(true);
    setProductCategory('mens');
    setProductName('');
    setProductThumbnail ('');
    setProductPrice(0);
    setProductDesc('');
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    dispatch (
      addProductStart({
        productCategory,
        productName,
        productThumbnail,
        productPrice,
        productDesc,
      })
      );
      resetForm();
      
    };
    
    const handleLoadMore = () => {
      dispatch(
        fetchProductsStart({
          startAfterDoc: queryDoc, 
          persistProducts: data,
        })
      );
    };

    const configLoadMore = {
      onLoadMoreEvt: handleLoadMore,
    };

  return (
    <div className="admin">

      <div className="callToActions">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>
              Add new product
            </Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>

            <h2>
              Add new product
            </h2>

            <FormSelect
              label="Category"
              options={[{
                value: "mens",
                name: "Mens"
              }, {
                value: "womens",
                name: "Womens"
              }]}
              handleChange={e => setProductCategory(e.target.value)}
            />

            <FormInput
              label="Name"
              type="text"
              value={productName}
              handleChange={e => setProductName(e.target.value)}
            />

            <FormInput
              label="Main image URL"
              type="url"
              value={productThumbnail}
              handleChange={e => setProductThumbnail(e.target.value)}
            />

            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              value={productPrice}
              handleChange={e => setProductPrice(e.target.value)}
            />
            <CKEditor 
              onChange={evt => setProductDesc(evt.editor.getData())}
            />

              <br />

            <Button type="submit">
              Add product
            </Button>

          </form>
        </div>
      </Modal>

      <div className="manageProducts">
              <table border="0" cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <th>
                      <h1>
                        Manage Products
                      </h1>
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <table className="results" border="0" cellPadding="10" cellSpacing="0">
                        <tbody>
                          {(Array.isArray(data) && data.length > 0) && data.map((product, index)=> {
                            const {
                              productName,
                              productThumbnail,
                              productPrice,
                              documentID,
                            } = product;
                            
                            return (
                              <tr key={index}>
                                <td>
                                  <img className="thumb" src={productThumbnail}></img>
                                </td>
                                <td>
                                  {productName}
                                </td>
                                <td>
                                  {productPrice} $
                                </td>
                                <td>
                                  <Button onClick={()=> dispatch(deleteProductStart(documentID))}>
                                    Delete
                                  </Button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>

                    </td>
                  </tr>
                  <tr>
                    <td>
                          <table border ="0" cellPadding="10px" cellSpacing="10px">
                            <tbody>
                              <tr>
                                <td>
                                  {!isLastPage &&(
                                    <LoadMore {...configLoadMore}/>
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                    </td>
                  </tr>
                </tbody>
              </table>
      </div>

    </div>
  );
}

export default Admin;