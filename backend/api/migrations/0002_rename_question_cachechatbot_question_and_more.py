# Generated by Django 5.1.4 on 2025-01-06 12:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cachechatbot',
            old_name='question',
            new_name='Question',
        ),
        migrations.RenameField(
            model_name='chatbot',
            old_name='question',
            new_name='Question',
        ),
    ]
