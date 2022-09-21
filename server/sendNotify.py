import firebase_admin
from firebase_admin import credentials
from firebase_admin import messaging
import datetime

cred = credentials.Certificate("./serviceAccountKey.json")
default_app = firebase_admin.initialize_app(credential=cred)
registration_token = "fuQ0LlBOTfakDxOnzN4SdD:APA91bFx2fjokXC7vfIpu_UmuzCA3myY05VgRiZQxErrgHAxx8C977PaYpffmY1fPHCvOiz4pKVyrd5_AggKeYqt66IzysOoCbGZ-lfoKTUXtb368Duec3ZNWTe2zTPQrDdluCfNPwrC"

# cred = credentials.Certificate("./serviceAccountKey.json")
# registration_token ="dm7Z9bjLRH6L07lv9rF-jo:APA91bEiCEZQIt2oZxXX7fpv9_7FLbPuKjGFCWQUv-wUNwZ1dqEzskagq8zmW-FKPyHBUvnn8o3kb57vYuS_pjRjHsf4FDjCUxwn_OlsEncrL5OQT4LLnNpInDdojwOZVH6Jn12OaD3a"
messages = [
    messaging.Message(
        # data={"screen_name": "RRRR", "title": "great match!", "body": "PortugalVSDenmark"},
        notification=messaging.Notification(
            title="qqqqqqqqq",
            body="wwwwwwwwwww",
            image="https://cdn-icons-png.flaticon.com/512/7246/7246727.png",
        ),
        data={
            "screen_name": "RRRR",
            "title": "great match!",
            "body": "PortugalVSDenmark",
            "test": "user|page-to-open|part-of-page-where-to-position|other-custom-data-needed",
        },
        token=registration_token,
    ),
]

response = messaging.send_all(messages)
print("{0} messages were sent successfully".format(response.success_count))
