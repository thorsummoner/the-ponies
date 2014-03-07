function MMul( x, y, z, matrix )
 {

  var ox, oy, oz, o;
  ox = (matrix[0] * x) + (matrix[1] * y) + (matrix[2] * z);
  oy = (matrix[4] * x) + (matrix[5] * y) + (matrix[6] * z);
  oz = (matrix[8] * x) + (matrix[9] * y) + (matrix[10] * z);
  return [ox, oy, oz];
 }

 function MMul4x4( a, b )
 {
  var i, j, k, sum;
  var out = new Array();
  for( i = 0; i < 4; i++ )
  {
   for( j = 0; j < 4; j++ )
   {
    sum = 0;
    for( k = 0; k < 4; k++ )
    {
     // TODO Optimize
     sum += a[i + (k<<2)] * b[i + (j<<2)];
    }
    out[i + (j<<2)] = sum;
   }
  }
  return out;
 }
// Credit - Greag Hedger
