from flask import Flask
from flask_cors import CORS
from ai_models.muse import muse_bp
from ai_models.echo import echo_bp
from ai_models.sage import sage_bp

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"]) 

# Register Blueprints (Modules)
app.register_blueprint(muse_bp, url_prefix='/api/muse')
app.register_blueprint(echo_bp, url_prefix='/api/echo')
app.register_blueprint(sage_bp, url_prefix='/api/sage')

if __name__ == "__main__":
    app.run(debug=True)
