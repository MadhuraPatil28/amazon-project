"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

var _productRouter = _interopRequireDefault(require("./routers/productRouter.js"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter.js"));

var _orderRouter = _interopRequireDefault(require("./routers/orderRouter.js"));

var _uploadRouter = _interopRequireDefault(require("./routers/uploadRouter.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));

_mongoose["default"].connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/uploads', _uploadRouter["default"]);
app.use('/api/users', _userRouter["default"]);
app.use('/api/products', _productRouter["default"]);
app.use('/api/orders', _orderRouter["default"]);
app.get('/api/config/paypal', function (req, res) {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

var _dirname = _path["default"].resolve();

app.use('/uploads', _express["default"]["static"](_path["default"].join(_dirname, '/uploads')));
app.use(_express["default"]["static"](_path["default"].join(_dirname, '/frontend/build')));
app.get('*', function (req, res) {
  return res.sendFile(_path["default"].join(_dirname, '/frontend/build/index.html'));
}); // app.get('/', (req, res) => {
//   res.send('Server is ready');
// });

app.use(function (err, req, res, next) {
  res.status(500).send({
    message: err.message
  });
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("Serve at http://localhost:".concat(port));
});