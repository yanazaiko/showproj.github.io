



const nodes = {
    1: { x: 50, y: 300 },
    2: { x: 150, y: 150 },
    3: { x: 300, y: 100 },
    4: { x: 450, y: 150 },
    5: { x: 350, y: 250 },
    6: { x: 200, y: 300 },
    7: { x: 400, y: 400 },
    8: { x: 100, y: 400 },
    9: { x: 300, y: 450 },
};


const edges = [
    { from: 1, to: 2, weight: 24 },
    { from: 2, to: 3, weight: 12 },
    { from: 3, to: 4, weight: 3 },
    { from: 4, to: 5, weight: 25 },
    { from: 5, to: 6, weight: 49 },
    { from: 2, to: 6, weight: 58 },
    { from: 6, to: 3, weight: 43 },
    { from: 1, to: 6, weight: 83 },
    { from: 1, to: 8, weight: 83 },
    { from: 6, to: 8, weight: 5 },
    { from: 8, to: 9, weight: 39 },
    { from: 6, to: 7, weight: 32 },
    { from: 5, to: 7, weight: 36 },
    { from: 4, to: 7, weight: 25 },
    { from: 7, to: 9, weight: 39 },
    { from: 9, to: 8, weight: 19 },
];


const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

   
    edges.forEach(edge => {
        const { from, to, weight } = edge;
        const startX = nodes[from].x;
        const startY = nodes[from].y;
        const endX = nodes[to].x;
        const endY = nodes[to].y;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
       
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;
        ctx.fillText(weight, midX, midY);
    });

    
    for (const node in nodes) {
        const { x, y } = nodes[node];
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fillText(node, x - 5, y + 5);
    }
}


function dijkstra(start, end) {
    const distances = {};
    const previous = {};
    const pq = [];

    
    for (const node in nodes) {
        distances[node] = Infinity;
        previous[node] = null;
    }
    distances[start] = 0;
    pq.push({ node: start, distance: 0 });

    while (pq.length > 0) {
        pq.sort((a, b) => a.distance - b.distance);
        const { node } = pq.shift();

        if (node == end) break;

        edges.forEach(edge => {
            if (edge.from == node || edge.to == node) {
                const neighbor = edge.from == node ? edge.to : edge.from;
                const newDist = distances[node] + edge.weight;

                if (newDist < distances[neighbor]) {
                    distances[neighbor] = newDist;
                    previous[neighbor] = node;
                    pq.push({ node: neighbor, distance: newDist });
                }
            }
        });
    }

   
    const path = [];
    let current = end;
    while (current) {
        path.unshift(current);
        current = previous[current];
    }

    return path;
}


function drawPath(path) {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;

    for (let i = 0; i < path.length - 1; i++) {
        const from = path[i];
        const to = path[i + 1];
        
        ctx.beginPath();
        ctx.moveTo(nodes[from].x, nodes[from].y);
        ctx.lineTo(nodes[to].x, nodes[to].y);
        ctx.stroke();
    }

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
}


function runDijkstra(start, end) {
    const path = dijkstra(start, end);
    drawGraph();
    drawPath(path);
}


drawGraph();
