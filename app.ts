import createError from 'http-errors';
import express from 'express';
import path from 'path';
import  cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import logger from 'morgan';
import OrderRoute from './Routes/OrderRoute';
 import AuthRoute from './Routes/AuthRoute';
 import {validateToken} from "./Services/AuthService";
// tslint:disable-next-line: triple-equals
const app = express();
// tslint:disable-next-line: triple-equals
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
import cors from 'cors';
app.use(cors({
    origin: '*'
}));

 app.use('/users', AuthRoute);
 app.use('/foodOrder', validateToken, OrderRoute);
// catch 404 and forward to error handler
app.use((req, res, next)=> {
  next(createError(404));
});

// error handler
app.use((err : any, req : express.Request, res : express.Response, next : express.NextFunction)=>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
