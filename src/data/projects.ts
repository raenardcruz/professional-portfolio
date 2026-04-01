import devotion from "../assets/devotion.png"
import floowsynk from "../assets/floowsynk.png"
import oasi from "../assets/oasi.png"

export const projects = [
    {
        "id": 1,
        "title": "Floowsynk Web App",
        "description": "A high-performance workflow automation and orchestration platform built with Go and Vue.js to streamline complex business processes.",
        "image": floowsynk,
        "technologies": ["Vue.js", "Go", "PostgreSQL", "Redis", "Docker", "Kafka", "Rest API", "gRPC", "Cloudflare Tunnel"],
        "link": "https://floowsynk.raenardcruz.com"
    },
    {
        "id": 2,
        "title": "Devotion Website",
        "description": "A digital sanctuary for the Catholic faith, featuring AI-enhanced daily Mass readings and interactive traditional prayer tools.",
        "image": devotion,
        "technologies": ["Vue.js", "Rest API", "Google ADK Agents", "Go", "Ollama", "Redis", "Cloudflare Tunnel"],
        "link": "https://devotion.raenardcruz.com/#/"
    },
    {
        "id": 3,
        "title": "Oasi Di Gioia Per Bambine Website",
        "description": "A secure pro-bono platform for a girls' orphanage, balancing compassionate advocacy with rigorous legal compliance.",
        "image": oasi,
        "technologies": ["Vue.js", "Cloudflare Pages"],
        "link": "https://oasi.raenardcruz.com/#/"
    }
]