export default function(record) {
    var z=0,i = 44, j, n = record.getInt32(36, true), m = record.getInt32(40, true), parts = new Array(n), points = new Array(m);
    for (j = 0; j < n; ++j, i += 4) parts[j] = record.getInt32(i, true);
    z = i + 16*m + 16
    for (j = 0; j < m; ++j, i += 16,z +=8){
        points[j] = [record.getFloat64(i, true), record.getFloat64(i + 8, true), record.getFloat64(z, true)];
        //console.log([record.getFloat64(i, true), record.getFloat64(i + 8, true), record.getFloat64(z, true)]);
    }

    return n === 1
        ? {type: "LineString", coordinates: points}
        : {type: "MultiLineString", coordinates: parts.map(function(i, j) { return points.slice(i, parts[j + 1]); })};
};
