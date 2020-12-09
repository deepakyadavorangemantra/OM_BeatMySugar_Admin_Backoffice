import React, { Component, Fragment } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

// import { getToken } from "../services/auth"
const ImageApiUrl = 'https://images.beatmysugar.com/api/Image/SaveImage';
const GetImageApiUrl = `https://images.beatmysugar.com/images/`;
class TextEditor extends Component{
    constructor(props){
        super(props)
        this.state = {
            value : '',
        }
    }
    onChange=(data)=>{
        debugger;
        this.setState({value:data})
    }
  render(){
    // const { value, onChange } = this.props // <- Dont mind this, just handling objects from props because Im using this as a shared component.

    const custom_config = {
      extraPlugins: [ MyCustomUploadAdapterPlugin ],
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'blockQuote',
          'insertTable',
          '|',
          'imageUpload',
          'undo',
          'redo'
        ]
      },
      table: {
        contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
      }
    }

    return(
          <CKEditor
            required
            editor={ClassicEditor}
            config={custom_config}
            data={this.state.value}
            onChange={(event, editor) => {
            const data = editor.getData()
              this.onChange(data)
            }}
          />
    )
  }
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader)
  }
}

class MyUploadAdapter {
    constructor(props) {
        // CKEditor 5's FileLoader instance.
      this.loader = props;
      // URL where to send files.
      this.url = `https://images.beatmysugar.com/images/Accreditations/`;
    }

    // Starts the upload process.
    upload() {
        return new Promise((resolve, reject) => {
            this._initRequest();
            this._initListeners(resolve, reject);
            this._sendRequest();
        } );
    }

    // Aborts the upload process.
    abort() {
        if ( this.xhr ) {
            this.xhr.abort();
        }
    }

    // Example implementation using XMLHttpRequest.
    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();
        xhr.open('POST', ImageApiUrl, true);
        xhr.responseType = 'json';        
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners(  resolve, reject ) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = 'Couldn\'t upload file:' + ` ${ loader.file.name }.`;

        xhr.addEventListener( 'error', () => reject( genericErrorText ) );
        xhr.addEventListener( 'abort', () => reject() );
        xhr.addEventListener( 'load', () => {
            const response = xhr.response;
            if ( !response || response.error ) {
                return reject( response && response.error ? response.error.message : genericErrorText );
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            resolve({
                default: response.s3Url
            });
        } );

        if ( xhr.upload ) {
            xhr.upload.addEventListener( 'progress', evt => {
                if ( evt.lengthComputable ) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            } );
        }
    }

    // Prepares the data and sends the request.
    _sendRequest() {
        const data = new FormData();

        this.loader.file.then(result => {
            let filename = result.name + Math.floor(1000 + Math.random() * 9000);
          data.append('file', result);
          data.append('foldername' , 'Accreditations')
          data.append('filename' , filename)
          this.xhr.send(data);
          }
        )
    }

}

export default TextEditor