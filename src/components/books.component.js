import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import React, { Component } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column'
import {Button} from 'primereact/button';
import { fetchBook } from '../../services/fetchLibraryBooks.service';

export default class Books extends Component {

    constructor() {
        super();
        this.state = {
            fetchBooks: []
        };
    }

    componentDidMount() {
       
        fetchBook(this.props.username)
        .then(res => {
            console.log('fetches',res);
            let favriteBks = [];
            res.forEach(ele => {
                ele.books.forEach((book) => {
                  let Bks = {bookTitle:book.name,bookTime:book.startTime,bookEndTime:book.endTime,bookId:book.bookId};
                  favriteBks.push(Bks);
                });
            });
            this.setState({fetchBooks:favriteBks})
        })
        .catch(error => {
            console.log('Error in fetchBooks :: ', error);
            return;
        });
    }

    render() {
        const paginatorLeft = <Button icon="pi pi-refresh"/>;
        return (
            <div className="auth-inner-favourite datatable-paginator-demo" >
                <h3>Favourite Books</h3>
                <DataTable value={this.state.fetchBooks} responsive={true} paginator={true} paginatorLeft={paginatorLeft}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Pagniation For Favourite Books" rows={5} rowsPerPageOptions={[5,10,20]}>
                    <Column field="bookId" header="Book Id" />
                    <Column field="bookTitle" header="Book Title" />
                
                </DataTable>
            </div>
        );
    }
}