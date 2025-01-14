from django.utils.timezone import localtime, now
from django.dispatch import receiver
from django.db.models.signals import pre_save
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken

@receiver(pre_save, sender=OutstandingToken)
def convert_token_expiry_to_local_timezone(sender, instance, **kwargs):
    # Konversi waktu ke Asia/Jakarta sebelum menyimpan ke database
    if instance.expires_at:
        instance.expires_at = localtime(instance.expires_at)
