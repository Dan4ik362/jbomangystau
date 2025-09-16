from django.db import models
from django.utils.translation import gettext_lazy as _


class Project(models.Model):
    CATEGORY_CHOICES = [
        ("state-social", _("Гос. соц. заказ")),
        ("state-grant", _("Грант")),
        ("charity", _("Благотворительная помощь")),
    ]

    title = models.CharField(_("Название"), max_length=255)
    client = models.CharField(_("Заказчик"), max_length=255)
    category = models.CharField(_("Категория"), max_length=50, choices=CATEGORY_CHOICES)
    image = models.ImageField(_("Фото"), upload_to="projects/", blank=True, null=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _("Проект")
        verbose_name_plural = _("Проекты")


class TeamMember(models.Model):
    name = models.CharField(_("Имя"), max_length=255)
    role = models.CharField(_("Роль"), max_length=100)
    image = models.ImageField(_("Фото"), upload_to="team/", blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("Член команды")
        verbose_name_plural = _("Члены команды")