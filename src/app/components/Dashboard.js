import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center p-3 bg-light">Total Posts: 42</div>
        </div>
        <div className="col-md-4">
          <div className="card text-center p-3 bg-light">Categories: 10</div>
        </div>
        <div className="col-md-4">
          <div className="card text-center p-3 bg-light">Users: 23</div>
        </div>
      </div>
      <div className="card p-3">Recent Activities</div>
    </div>
  );
}
