from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.contrib import messages
from django.urls import reverse

def home(request):
    return render(request, 'main/index.html')

def send_email(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')

        # Формируем письмо
        subject = f"Новое сообщение от {name}"
        body = f"Имя: {name}\nEmail: {email}\nСообщение: {message}"
        from_email = email  # Используем email отправителя
        recipient_list = ['mangystau.bastama@gmail.com']

        try:
            send_mail(subject, body, from_email, recipient_list, fail_silently=False)
            messages.success(request, 'Ваше сообщение успешно отправлено!')
        except Exception as e:
            messages.error(request, f'Ошибка при отправке сообщения: {str(e)}')

        return redirect('home')  # Перенаправляем на главную страницу
    return render(request, 'main/index.html')  # Для GET-запросов отображаем главную страницу