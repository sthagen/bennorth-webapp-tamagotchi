$(document).ready(function()
{
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d');

    var health = 100;
    var hungriness = 0;

    function alien_is_alive()
    {
        return (hungriness < 100) && (health > 0);
    }

    function draw_circle(x, y, r)
    {
        ctx.beginPath();
        ctx.arc(x, y, r, 0.0, 2.0 * Math.PI, false);
        ctx.fill();
    }

    ctx.fillStyle = 'green';
    draw_circle(240, 240, 180);

    function draw_alien()
    {
        ctx.clearRect(0, 0, 480, 480);
        ctx.fillStyle = 'blue';

        draw_circle(240, 110, 80);
        draw_circle(240, 300, 150);

        ctx.fillStyle = 'black';
        draw_circle(210, 90, 10);
        draw_circle(270, 90, 10);

        ctx.lineWidth = 5.0;
        ctx.beginPath();
        ctx.moveTo(200, 130);
        ctx.lineTo(220, 150);
        ctx.lineTo(260, 150);
        ctx.lineTo(280, 130);
        ctx.stroke();
    }

    $('#hatch').click(draw_alien_fade_instructions);

    function fade_out_hatch_instructions()
    {
        $('#hatch-instructions').fadeOut(400, fade_in_playing_sections);
    }

    function fade_in_playing_sections()
    {
        $('#levels').fadeIn();
        $('#action-buttons').fadeIn();
    }

    function draw_alien_fade_instructions()
    {
        draw_alien();
        fade_out_hatch_instructions();
        window.setTimeout(time_goes_by, 2000);
    }

    function make_alien_hungrier()
    {
        hungriness += 5;
        $('#hungriness').html('Hungriness: ' + hungriness);
    }

    function enable_bread_button()
    {
        $('#feed-bread').attr('disabled', false);
    }

    function feed_alien_some_bread()
    {
        hungriness -= 20;
        if (hungriness < 0)
        {
            hungriness = 0;
        }

        $('#hungriness').html('Hungriness: ' + hungriness);

        // The player can't immediately give more bread
        $('#feed-bread').attr('disabled', true);
        //
        // but after a few seconds have gone by, they can.
        window.setTimeout(enable_bread_button, 3000);
    }

    $('#feed-bread').click(feed_alien_some_bread);

    function enable_sweets_button()
    {
        $('#feed-sweets').attr('disabled', false);
    }

    function feed_alien_sweets()
    {
        hungriness -= 10;
        if (hungriness < 0)
        {
            hungriness = 0;
        }

        $('#hungriness').html('Hungriness: ' + hungriness);

        // But sweets are not healthy:
        health -= 5;
        $('#health').html('Health: ' + health);
        // TODO: Make the alien die if all health gone.

        // The player can't immediately give more sweets
        $('#feed-sweets').attr('disabled', true);
        //
        // but after a few seconds have gone by, they can.
        window.setTimeout(enable_sweets_button, 2000);
    }

    $('#feed-sweets').click(feed_alien_sweets);

    function time_goes_by()
    {
        make_alien_hungrier();

        if (alien_is_alive())
        {
            window.setTimeout(time_goes_by, 2000);
        }
        else
        {
            $('#messages').html('Oh no!  Your Tamagotchi died!');
        }
    }
});
