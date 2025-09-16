from django.contrib import admin
from django.utils.html import format_html
from .models import Project, TeamMember


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "client", "category", "preview")
    list_filter = ("category",)

    def preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height:50px; border-radius:5px;"/>',
                obj.image.url,
            )
        return "—"

    preview.short_description = "Фото"


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "preview")

    def preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height:50px; border-radius:5px;"/>',
                obj.image.url,
            )
        return "—"

    preview.short_description = "Фото"