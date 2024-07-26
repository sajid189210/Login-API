const express = require ( 'express' );
const path = require ( 'path' );
const session = require( 'express-session' );
const app = express ();
const noCache = require ( 'nocache' );


//to prevent caching all routes
app.use ( noCache() );


//setting session 
app.use(session ( {
    secret: '1klm3',
    resave: false,
    saveUninitialized: false,
} ) );


//requiring the user router
const userRouter = require ( './Routes/user' );


//setting the render engine and the path
app.set('views', path.join ( __dirname, 'Views' ) );
app.set ( 'view engine', 'ejs' );


//serving static files ( public )
app.use ( express.static( path.join( __dirname, './Public' ) ) );

// Parsing the data submitted via HTTP POST method into a req.body
app.use ( express.urlencoded ( { extended: true } ) );


//user router
app.use( '/user', userRouter );


const PORT = 8080;
app.listen( PORT, ( error ) => {
    if ( !error ){
        console.log( `Server started successfully on ${PORT}` );
    } else {
        console.error( `Server failed to start on ${PORT}`, error );
    }
} );
