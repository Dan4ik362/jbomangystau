from django.shortcuts import render, redirect
from django.core.mail import EmailMessage
from django.contrib import messages
from .models import Project, TeamMember


def home(request):
    projects = Project.objects.all()
    team_members = TeamMember.objects.all()
    return render(
        request,
        "main/index.html",
        {"projects": projects, "team_members": team_members},
    )


def send_email(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        message = request.POST.get("message")

        # Формируем письмо
        subject = f"Новое сообщение от {name}"
        body = f"Имя: {name}\nEmail: {email}\nСообщение: {message}"

        try:
            from_email = f"{name} <mangystau.bastama@gmail.com>"

            mail = EmailMessage(
                subject=subject,
                body=body,
                from_email=from_email,
                to=["mangystau.bastama@gmail.com"],
                reply_to=[email],
            )
            mail.send(fail_silently=False)
            messages.success(request, "Ваше сообщение успешно отправлено!")
        except Exception as e:
            messages.error(request, f"Ошибка при отправке сообщения: {str(e)}")

        return redirect("home")
    return render(request, "main/index.html")


def projects_view(request):
    projects = Project.objects.all()
    return render(request, "main/projects.html", {"projects": projects})

