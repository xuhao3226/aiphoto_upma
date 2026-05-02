let isProcessing = false;
let removedBgImage = null;

function previewImage(input, imageId, placeholderId) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById(imageId).src = e.target.result;
            document.getElementById(imageId).style.display = 'block';
            document.getElementById(placeholderId).style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}

async function processBackgroundRemoval() {
    if (isProcessing) return;

    const imageSubject = document.getElementById('imageSubject');
    const button = document.getElementById('processBtn');
    const loadingOverlay = document.getElementById('loadingOverlay');

    if (!imageSubject.src || imageSubject.style.display === 'none') {
        alert('请先在副图框上传人物图片');
        return;
    }

    isProcessing = true;
    button.disabled = true;
    loadingOverlay.style.display = 'flex';

    try {
        const response = await fetch('http://localhost:5001/remove-background', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: imageSubject.src
            })
        });

        const data = await response.json();

        if (data.success) {
            removedBgImage = data.image;
            imageSubject.src = data.image;
            alert('去背景成功！现在可以点击"合成图片"按钮');
        } else {
            alert('去背景失败: ' + (data.error || '未知错误'));
        }

    } catch (error) {
        console.error('去背景失败:', error);
        alert('去背景失败，请确保后端服务已启动');
    } finally {
        isProcessing = false;
        button.disabled = false;
        loadingOverlay.style.display = 'none';
    }
}

function composeImages() {
    const imageMain = document.getElementById('imageMain');
    const imageResult = document.getElementById('imageResult');
    const placeholderResult = document.getElementById('placeholderResult');
    const button = document.getElementById('composeBtn');
    const loadingOverlay = document.getElementById('loadingOverlay');

    if (!imageMain.src || imageMain.style.display === 'none') {
        alert('请先在主图框上传背景图片');
        return;
    }

    if (!removedBgImage) {
        alert('请先对副图进行去背景处理');
        return;
    }

    button.disabled = true;
    loadingOverlay.style.display = 'flex';

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const mainImg = new Image();
    const subjectImg = new Image();

    mainImg.crossOrigin = 'anonymous';
    subjectImg.crossOrigin = 'anonymous';

    mainImg.onload = function() {
        subjectImg.onload = function() {
            const subjectScale = 0.25;
            const subjectWidth = subjectImg.width * subjectScale;
            const subjectHeight = subjectImg.height * subjectScale;

            const canvasWidth = Math.max(mainImg.width, subjectWidth + mainImg.width * 0.6);
            const canvasHeight = Math.max(mainImg.height, subjectHeight);

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            const mainX = 10;
            const mainY = canvasHeight - mainImg.height - 10;
            ctx.drawImage(mainImg, mainX, mainY);

            const subjectX = canvasWidth - subjectWidth - 10;
            const subjectY = canvasHeight - subjectHeight - 10;
            ctx.drawImage(subjectImg, subjectX, subjectY, subjectWidth, subjectHeight);

            const resultDataUrl = canvas.toDataURL('image/png');
            imageResult.src = resultDataUrl;
            imageResult.style.display = 'block';
            placeholderResult.style.display = 'none';

            button.disabled = false;
            loadingOverlay.style.display = 'none';
        };

        subjectImg.src = removedBgImage;
    };

    mainImg.src = imageMain.src;
}

function downloadImage() {
    const imageResult = document.getElementById('imageResult');

    if (!imageResult.src || imageResult.style.display === 'none') {
        alert('没有可下载的合成图片');
        return;
    }

    const link = document.createElement('a');
    link.href = imageResult.src;
    link.download = '合成图片_' + new Date().getTime() + '.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function resetImages() {
    const imageMain = document.getElementById('imageMain');
    const imageSubject = document.getElementById('imageSubject');
    const imageResult = document.getElementById('imageResult');
    const placeholderMain = document.getElementById('placeholderMain');
    const placeholderSubject = document.getElementById('placeholderSubject');
    const placeholderResult = document.getElementById('placeholderResult');
    const inputMain = document.getElementById('inputMain');
    const inputSubject = document.getElementById('inputSubject');

    imageMain.src = '';
    imageMain.style.display = 'none';
    placeholderMain.style.display = 'flex';

    imageSubject.src = '';
    imageSubject.style.display = 'none';
    placeholderSubject.style.display = 'flex';

    imageResult.src = '';
    imageResult.style.display = 'none';
    placeholderResult.style.display = 'flex';

    if (inputMain) inputMain.value = '';
    if (inputSubject) inputSubject.value = '';

    removedBgImage = null;
}