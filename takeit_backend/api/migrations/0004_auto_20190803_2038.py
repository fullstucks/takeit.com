# Generated by Django 2.2.1 on 2019-08-03 20:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_usuario_es_admin_restaurante'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usuario',
            old_name='restaurantes_favoritos',
            new_name='restaurantes_fav_or_owned',
        ),
    ]
