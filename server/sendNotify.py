import firebase_admin
from firebase_admin import credentials
from firebase_admin import messaging
import datetime

cred = credentials.Certificate("./serviceAccountKey.json")
default_app = firebase_admin.initialize_app(credential=cred)
registration_token = "dO5ZbBIAQr6IMvgwN5QriG:APA91bHqrxWDOYzssHM21FAAErHJbAtWzbvvtZ68263XJIqZVPXRDQZ2y3Tm50eOv86oMtySlBENNQr3OGcqgCwTpvCMPZ4xO7Av3zQC9-Q4JlQAur6-aVD9gqHdGARGVaZTO-T8aHO_"

messages = [
    messaging.Message(
        # data={"screen_name": "RRRR", "title": "great match!", "body": "PortugalVSDenmark"},
        notification=messaging.Notification(
            title="qqqqqqqqq",
            body="wwwwwwwwwww",
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
