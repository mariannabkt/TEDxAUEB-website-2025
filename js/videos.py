import requests
import json

PLAYLIST_ID = "PLE5bRppwNyPlBZnpRGCIS2RKJ5hxeLBgu"
API_KEY = "AIzaSyCXNuJJncVKBF-poq_QjvkNE_CBJ4nl97g"
MAX_RESULTS = 50
videos = []
next_page_token = ""

def fetch_playlist_videos(page_token=""):
    global next_page_token
    url = f"https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId={PLAYLIST_ID}&maxResults={MAX_RESULTS}&key={API_KEY}"
    if page_token:
        url += f"&pageToken={page_token}"

    response = requests.get(url)
    data = response.json()

    video_ids = [item["snippet"]["resourceId"]["videoId"] for item in data["items"]]
    fetch_video_details(video_ids)

    next_page_token = data.get("nextPageToken")
    if next_page_token:
        fetch_playlist_videos(next_page_token)

def fetch_video_details(video_ids):
    url = f"https://www.googleapis.com/youtube/v3/videos?part=snippet&id={','.join(video_ids)}&key={API_KEY}"
    response = requests.get(url)
    data = response.json()

    for video in data["items"]:
        videos.append({
            "title": video["snippet"]["title"],
            "videoId": video["id"],
            "thumbnailUrl": f"https://img.youtube.com/vi/{video['id']}/0.jpg",
            "year": video["snippet"]["publishedAt"][:4]  # Παίρνει μόνο το έτος
        })

fetch_playlist_videos()

# Αποθήκευση σε JSON αρχείο
with open("videos.json", "w", encoding="utf-8") as f:
    json.dump(videos, f, indent=4, ensure_ascii=False)

print("Videos saved to videos.json")
