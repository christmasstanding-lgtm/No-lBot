import gradio as gr
import requests

def envoyer_bilan(utilisateurs):
    r = requests.post("https://ton-api.com/api/bilan", json={"totalUtilisateurs": utilisateurs})
    return "Bilan envoyé !" if r.status_code == 200 else "Erreur :("

iface = gr.Interface(fn=envoyer_bilan, inputs="number", outputs="text")
iface.launch()
