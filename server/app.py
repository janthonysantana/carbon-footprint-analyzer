from flask import Flask


def run_app():
    app = Flask(__name__)

    # Base endpoint
    @app.get("/")
    def root():
        """
        Health probe endpoint.
        """    
        return {"status": "ready"}

    return app

app = run_app()

if __name__ == "__main__":
    app.run(debug=True)